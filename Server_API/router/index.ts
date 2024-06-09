import express from 'express';

import bookRouter  from '../router/book';
import authenticateRouter from '../router/authentication';
import userRouter from '../router/user';
import lendingRouter from '../router/lending';

const router = express.Router();

export default (): express.Router  => {

    bookRouter(router);
    authenticateRouter(router);
    lendingRouter(router);
    userRouter(router);
    return router;
}