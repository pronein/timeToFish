(function(ng) {
  ng.module('ttfSession')
      .controller('SessionController', [function() {
        var ctrl = this;

        ctrl.vm = {
          username: 'pronein',
          password: 'password'
        };

        ctrl.signin = signin;
        ctrl.logout = logout;

        function signin() {
          alert('signing in!');
        }

        function logout() {
          alert('logging out!');
        }

      }]);
})(window.angular);