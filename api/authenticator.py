import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts_queries import (
    Accountsrepository,
    AccountOut,
)


class PassProAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: Accountsrepository,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: Accountsrepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOut):
        return account["password"]

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account["username"], AccountOut(**account)


authenticator = PassProAuthenticator(os.environ["SIGNING_KEY"])
