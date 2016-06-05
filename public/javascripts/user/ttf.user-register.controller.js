(function (ng) {
  'use strict';

  var inject = ['userService', '$state'];

  function UserRegisterController(userService, $state) {
    var ctrl = this;

    ctrl.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: {
        first: '',
        middle: '',
        last: ''
      }
    };

    ctrl.validate = {
      username: {
        getCss: _getCssForUsernameValidity,
        getInputCss: _getCssForUsernameInputValidity,
        isValid: _usernameIsValid,
        isUnavailable: _usernameIsUnavailable,
        isQuerying: _usernameIsQuerying,
        isMissing: _usernameIsMissing
      },
      email: {
        getCss: _getCssForEmailValidity,
        getInputCss: _getCssForEmailInputValidity,
        isValid: _emailIsValid,
        isMissing: _emailIsMissing,
        hasFormatError: _emailHasFormatError
      },
      password: {
        getCss: _getCssForPasswords,
        getInputCss: _getCssForPasswordInput,
        isValid: _passwordIsValid,
        isMissing: _passwordIsMissing
      },
      confirmPassword: {
        getInputCss: _getCssForConfirmPasswordInput,
        passwordsMatch: _passwordsMatch
      },
      name: {
        getCss: _getCssForNames
      },
      firstName: {
        isMissing: _firstNameIsMissing,
        getInputCss: _getCssForFirstNameInput
      },
      lastName: {
        isMissing: _lastNameIsMissing,
        getInputCss: _getCssForLastNameInput
      }
    };

    ctrl.registerUser = _registerUser;

    function _registerUser(form) {
      if (form.$valid) {
        userService.registerNewUser(ctrl.user)
          .then(function () {
            $state.go('home', {}, {location: 'replace'})
              .then(function () {
                console.log('state transition accepted.');
              })
              .catch(function () {
                console.error('state transition rejected.');
              });
          });
      }
    }

    function _shouldValidate(form, ctrlName) {
      return form.$submitted || form[ctrlName].$touched;
    }

    /* Username
     */
    function _getCssForUsernameValidity(form) {
      return {
        'has-error': _usernameIsMissing(form) || _usernameIsUnavailable(form),
        'has-warning': _usernameIsQuerying(form),
        'has-success': _usernameIsValid(form)
      };
    }

    function _getCssForUsernameInputValidity(form) {
      return {
        'glyphicon': _shouldValidate(form, 'username'),
        'glyphicon-ok': _usernameIsValid(form),
        'glyphicon-remove': _usernameIsMissing(form) || _usernameIsUnavailable(form),
        'glyphicon-warning-sign': _usernameIsQuerying(form)
      };
    }

    function _usernameIsMissing(form) {
      return _shouldValidate(form, 'username') && !_usernameIsQuerying(form) && !_usernameIsUnavailable(form) &&
        form.username.$error.required;
    }

    function _usernameIsQuerying(form) {
      return _shouldValidate(form, 'username') && !form.username.$error.required &&
        form.username.$pending;
    }

    function _usernameIsUnavailable(form) {
      return _shouldValidate(form, 'username') && !form.username.$error.required && !form.username.$pending &&
        form.username.$error.username;
    }

    function _usernameIsValid(form) {
      return _shouldValidate(form, 'username') && !_usernameIsMissing(form) && !_usernameIsUnavailable(form) && !_usernameIsQuerying(form);
    }

    /* Email
     */
    function _getCssForEmailValidity(form) {
      return {
        'has-error': _emailIsMissing(form) || _emailHasFormatError(form),
        'has-success': _emailIsValid(form)
      };
    }

    function _getCssForEmailInputValidity(form) {
      return {
        'glyphicon': _shouldValidate(form, 'email'),
        'glyphicon-ok': _emailIsValid(form),
        'glyphicon-remove': _emailIsMissing(form) || _emailHasFormatError(form)
      };
    }

    function _emailIsMissing(form) {
      return _shouldValidate(form, 'email') &&
        form.email.$error.required && !form.email.$error.email;
    }

    function _emailIsValid(form) {
      return _shouldValidate(form, 'email') && !form.email.$error.required && !form.email.$error.email;
    }

    function _emailHasFormatError(form) {
      return _shouldValidate(form, 'email') &&
        form.email.$error.email && !form.email.$error.required;
    }

    /* Passwords
     */
    function _getCssForPasswords(form) {
      if (_shouldValidate(form, 'password') && _shouldValidate(form, 'confirmPassword')) {
        return {
          'has-error': _passwordIsMissing(form) || !_passwordsMatch(form),
          'has-success': _passwordIsValid(form) && _passwordsMatch(form)
        };
      }
    }

    function _getCssForPasswordInput(form) {
      if (_shouldValidate(form, 'password')) {
        return {
          'glyphicon': true,
          'glyphicon-ok': _passwordIsValid(form),
          'glyphicon-remove': _passwordIsMissing(form)
        };
      }
    }

    function _getCssForConfirmPasswordInput(form) {
      if (_shouldValidate(form, 'confirmPassword')) {
        return {
          'glyphicon': true,
          'glyphicon-ok': _passwordsMatch(form),
          'glyphicon-remove': !_passwordsMatch(form)
        };
      }
    }

    function _passwordIsValid(form) {
      return _shouldValidate(form, 'password') && !form.password.$error.required;
    }

    function _passwordIsMissing(form) {
      return _shouldValidate(form, 'password') &&
        form.password.$error.required;
    }

    function _passwordsMatch(form) {
      return (_shouldValidate(form, 'confirmPassword') &&
        ctrl.user.password === ctrl.user.confirmPassword && !form.confirmPassword.$error.required) || !_shouldValidate(form, 'confirmPassword');
    }

    /* Names
     */
    function _getCssForNames(form) {
      if (_shouldValidate(form, 'firstName') || _shouldValidate(form, 'lastName')) {
        return {
          'has-error': _firstNameIsMissing(form) || _lastNameIsMissing(form),
          'has-success': _firstNameIsValid(form) && _lastNameIsValid(form)
        };
      }
    }

    function _getCssForFirstNameInput(form) {
      if (_shouldValidate(form, 'firstName')) {
        return {
          'glyphicon': true,
          'glyphicon-ok': _firstNameIsValid(form),
          'glyphicon-remove': _firstNameIsMissing(form)
        };
      }
    }

    function _getCssForLastNameInput(form) {
      if (_shouldValidate(form, 'lastName')) {
        return {
          'glyphicon': true,
          'glyphicon-ok': _lastNameIsValid(form),
          'glyphicon-remove': _lastNameIsMissing(form)
        };
      }
    }

    function _firstNameIsMissing(form) {
      return _shouldValidate(form, 'firstName') &&
        form.firstName.$error.required;
    }

    function _firstNameIsValid(form) {
      return _shouldValidate(form, 'firstName') && !form.firstName.$error.required;
    }

    function _lastNameIsMissing(form) {
      return _shouldValidate(form, 'lastName') &&
        form.lastName.$error.required;
    }

    function _lastNameIsValid(form) {
      return _shouldValidate(form, 'lastName') && !form.lastName.$error.required;
    }
  }

  UserRegisterController.$inject = inject;

  ng.module('ttfUser')
    .controller('UserRegisterController', UserRegisterController);

})(window.angular);