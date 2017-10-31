import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
import 'react-select/dist/react-select.css';
import './routes.js';

Bert.defaults = {
  hideDelay: 5500,
  // Accepts: a number in milliseconds.
  style: 'growl-top-right',
  // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
  // growl-bottom-left, growl-bottom-right.
  type: 'default',
  // Accepts: default, success, info, warning, danger.
};
