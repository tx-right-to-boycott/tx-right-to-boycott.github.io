(function () {

    // hasClass
    function hasClass(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }

    // toggleClass
    function toggleClass(elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        } else {
            elem.className += ' ' + className;
        }
    }

    var hideElement = function(elem) {

      if (!hasClass(elem, 'hidden')) {
        elem.className += ' hidden';
      }
    };

    var showElement = function(elem) {
      if (hasClass(elem, 'hidden')) {
        elem.className = elem.className.replace('hidden', '').trim();
      }
    };

    var displayElement = function(elem) {
      showElement(elem);

      if (!hasClass(elem, 'displayed')) {
        elem.className += ' displayed';
      }
    };

    // Mobile nav function
    var mobileNav = document.querySelector('.nav-mobile');
    var toggle = document.querySelector('.nav-list');
    var navbar = document.querySelector('#navbar');

    var topLevelNavItems = document.querySelectorAll('.top-nav-only');
    var submenuNav = document.querySelector('.dropdown-menu');
    var submenuNavItems = document.querySelectorAll('.dropdown-item');
    var submenuNavLinkNonMobile = document.querySelector('.navbar-dropdown-link');
    var submenuNavLink = document.querySelector('.navbar-mobile-dropdown-link');
    var submenuNavBackLink = document.querySelector('.navbar-mobile-dropdown-back-link');

    var setUpInitialMenuState = function() {

      displayElement(navbar);

      topLevelNavItems.forEach(function(item) {
        showElement(item, 'hidden');
      });

      hideElement(submenuNavLinkNonMobile);
      showElement(submenuNavLink);
      hideElement(submenuNav);

      submenuNavItems.forEach(function(item) {
        hideElement(item, 'hidden');
      });

      hideElement(submenuNavBackLink);
    };

    mobileNav.onclick = function () {

      if (hasClass(navbar, 'hidden') || !hasClass(navbar, 'displayed')) {
        setUpInitialMenuState();
      } else {
        hideElement(navbar);
      }
    };

    submenuNavLink.onclick = function(event) {

      event.stopPropagation();
      event.preventDefault();

      topLevelNavItems.forEach(function(item) {
        hideElement(item);
      });

      hideElement(submenuNavLink);
      displayElement(submenuNav);

      submenuNavItems.forEach(function(item) {
        displayElement(item);
      });

      showElement(submenuNavBackLink);
    }

    submenuNavBackLink.onclick = function(event) {
      event.stopPropagation();
      event.preventDefault();
      setUpInitialMenuState();
    }
})();
