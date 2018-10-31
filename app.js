const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const shiftsRouter = require('./routes/shifts');
const assignmentsRouter = require('./routes/assignments');
const rolesRouter = require('./routes/roles');
const notificationsRouter = require('./routes/notifications');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/shifts', shiftsRouter);
app.use('/assignments', assignmentsRouter);
app.use('/roles', rolesRouter);
app.use('/notifications', notificationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


/* **************************************************
 *  restructureError()
 *  If not restructured information is lost when passed back to AJAX caller
 *  @param Error -- actual Error object with optional 'status'
 *  Returns object { message: 'xxxx', status: 123, name: 'xxx', stack: 'xxx' }
 ***************************************************** */
function restructureError(error) {
  // return if error not in the expected form
  if (!error.stack)
    return error;

  const restructured = {
    error: {
      message: error.message,
      status: error.status,
      name: error.name,
    },
  };

  // look for " at " which seperates the error message from actual call stack
  const i = error.stack.search(' at ');
  restructured.error.stack = (i === -1) ? error.stack : error.stack.slice(i + 4);

  return restructured;
}

// ===========================================================
// Error handler for next(object) / 500
// ===========================================================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log("======================= APP ERROR IN CONTROLLER =======================");
  console.log('status: ',status);
  console.log('-------');
  console.log('raw error: ',err);
  console.log('-------');
  console.log('error that would go back to AJAX: ', err.toString());
  console.log('-------');
  console.log('restructured error: ', restructureError(err));
  console.log("^^^^^^^^^^^^^^^^^^^^^^^ APP ERROR IN CONTROLLER ^^^^^^^^^^^^^^^^^^^^^^");
  res.status(status).json(restructureError(err));
  next();
});

// error handler from original express-generator
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
