import express from 'express';

import bookRouter  from '../router/book';

const router = express.Router();

export default (): express.Router  => {

    bookRouter(router);

    return router;
}