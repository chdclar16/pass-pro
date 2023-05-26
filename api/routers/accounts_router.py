from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union, List, Optional
from queries.accounts_queries import (
    AccountIn,
    Accountsrepository,
    AccountOut,
    Error,
    DuplicateAccountError,
    EditAccountIn,
    EditAccountOut,
)
from pydantic import BaseModel


router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.put(
    "/api/accounts/{account_id}", response_model=Union[EditAccountOut, Error]
)
def update_account(
    account_id: str,
    account: EditAccountIn,
    repo: Accountsrepository = Depends(),
) -> Union[EditAccountOut, Error]:
    return repo.update_account_info(account_id, account)


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Accountsrepository = Depends(
        authenticator.get_current_account_data
    ),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: Accountsrepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
