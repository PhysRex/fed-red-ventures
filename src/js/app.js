
const handler = {
  contactPro() {
    return document.querySelectorAll('.results-btn');
  },
  checkboxes: document.querySelectorAll('.checkbox-container'),
  modalCheckboxContainers: document.querySelectorAll('.modal-checkbox-container'),
  modalCheckboxes: document.querySelectorAll('.modal-checkbox'),
  modalSend: document.querySelector('.modal-send').children,
  modalInput: document.querySelectorAll('.modal-input'),
  modalComments: document.querySelector('.modal-comments'),
  modalImgs: document.querySelectorAll('.modal-validation-img'),
  navItemMobile: document.querySelectorAll('.nav-item-mobile'),
  buttons: {
    findPro: document.querySelector('.header-btn'),
    contactProClose: document.querySelector('.modal-close-content'),
  },
  elements: {
    modal: document.querySelector('.modal'),
    modalHeader: document.querySelector('.modal-header'),
    modalSection: document.querySelector('.modal-section'),
    search: document.querySelector('.search'),
    mainSection: document.getElementById('main'),
    mainHeader: document.querySelector('.main-header'),
    fieldset: document.querySelector('.filter-options'),
    filterIcon: document.querySelector('.filter-icon'),
    searchSummary: document.querySelector('.search-summary'),
    resultList: document.querySelector('.result-list'),
    navMobile: document.querySelector('.nav-container-mobile'),
    navBtn: document.querySelector('.nav-btn'),
    navSpan: document.querySelector('.nav-span'),
  },
  // Event listeners for buttons clicked
  listeners: {
    initialize() {
      // add listeners to all checkboxes
      [...handler.checkboxes].forEach(checkbox => (checkbox).addEventListener('click', actions.showCards));
      [...handler.modalCheckboxContainers].forEach(checkbox => (checkbox).addEventListener('click', actions.modalPoolCheck));

      // add listeners to buttons
      handler.buttons.findPro.addEventListener('click', actions.findProPress);
      handler.buttons.contactProClose.addEventListener('click', actions.closeModal);

      // add listener to nav button and nav close button
      handler.elements.navBtn.addEventListener('click', actions.toggleNav);
      handler.elements.navSpan.addEventListener('click', actions.toggleNav);
      [...handler.navItemMobile].forEach(navItem => (navItem).addEventListener('click', actions.toggleNav));

      // add listener to modal overlay
      handler.elements.modal.addEventListener('click', actions.closeOnlyModal);

      // add listener to filter icon
      handler.elements.filterIcon.addEventListener('click', actions.toggleFilter);
      
      // modal input validation listeners
      [...handler.modalInput].forEach(pro => (pro).addEventListener('keyup', actions.modalValidation));

      // modal send button listeners
      [...handler.modalSend].forEach(pro => (pro).addEventListener('click', actions.modalSend));
    },
    cards() {
      // remove any existing event listeners to all contactPro cards
      [...handler.contactPro()].forEach(pro => (pro).removeEventListener('click', actions.openModal));
      // add listeners to all contactPro cards
      [...handler.contactPro()].forEach(pro => (pro).addEventListener('click', actions.openModal));
    },
  },
}


const actions = {
  openModal(event) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.classList.add("overflow-y-hidden");
    handler.elements.modal.style.display = "block";

    // set modal title
    actions.modalTitle(event.currentTarget.dataset.title);
  },
  closeModal(event) {
    document.body.classList.remove("overflow-y-hidden");    
    handler.elements.modal.style.display = "none";
  },
  closeOnlyModal(event) {
    if (event.target.id === 'poolModal') actions.closeModal();
  },
  modalTitle(title) {
    handler.elements.modalHeader.querySelector('.modal-title').innerHTML = title;
  },
  modalValidation({ target }) {
    const inputImg = target.previousElementSibling.firstElementChild;
    // change validation image
    if (target.value.length > 0) {
      inputImg.src = 'src/assets/checkmark-circle.png';
      target.classList.remove('modal-input-border-wrong');      
    } else {
      inputImg.src = 'src/assets/circle-form.png';
      target.classList.add('modal-input-border-wrong');
    }
  },
  modalPoolCheck({ target, currentTarget }) {
    // check modal checkboxes
    [...handler.modalCheckboxes].forEach((box) => {
      if (box.classList.contains('checkbox-clicked') && box.dataset.name !== currentTarget.dataset.name) {
        box.classList.remove('checkbox-clicked');
      }
    });
  },
  modalSend(event) {
    //check validation
    const imgs = [...handler.modalImgs].map(images => images.src);
    const imgsTest = imgs.every(src => src.includes('checkmark-circle'));
    if ([...handler.modalImgs].map(images => images.src).every(src => src.includes('checkmark-circle'))) {
      actions.closeModal();
        
      // clear modal input, reset images
      [...handler.modalInput, handler.modalComments].forEach(input => input.value = '');
      [...handler.modalImgs].map(images => images.src = 'src/assets/circle-form.png');
    } else {
      [...handler.modalImgs].map(image => {
        if (image.src.includes('circle-form')) {
          image.parentElement.nextElementSibling.classList.add('modal-input-border-wrong');
        }
      });
    }
  },
  findProPress() {
    handler.elements.search.firstElementChild.classList.remove('hide-visibility');
    handler.elements.mainSection.classList.remove('main-bg');
    handler.elements.mainHeader.classList.add('hide');
  },
  toggleNav() {
    handler.elements.navMobile.classList.toggle("hide");
    handler.elements.search.firstElementChild.classList.add('hide-visibility');
    handler.elements.mainSection.classList.add('main-bg');
    handler.elements.mainHeader.classList.remove('hide');
    handler.elements.resultList.innerHTML = '';
  },
  makeElement(options) {
    const {
      element = 'div',
      classNames = '',
      id,
      src,
      href,
      data,
      content = '',
    } = options;

    const elem = document.createElement(element);
    elem.classList.add(...classNames);
    if (id) elem.id = id;
    if (src) elem.src = src;
    if (href) elem.href = href;
    if (data) elem.dataset.title = data;
    if ((typeof content) === 'string') {
      elem.innerHTML = content;
    } else if ((typeof content) == 'object') {
      content.forEach(val => elem.appendChild(val));
    } else {
      elem.appendChild(content);
    }

    return elem;
  },
  makeCard(info) {
    const {      
      companyID,
      name,
      phone1,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipcode,
      weekHours,
      certifications,
    } = info;

    const certificationImages = {
      "Installation Pro": "src/assets/star-installation-pro.png",
      "Residential Pro": "src/assets/home-residential-pro.png",
      "Commercial Pro": "src/assets/users-commercial-pro.png",
      "Service Pro": "src/assets/gear-service-pro.png",
    }


    //create header for result card
    const header = actions.makeElement({
      element: 'header',
      classNames: ['margin-left-right-25', 'padding-top-bottom-20', 'text-center', 'flex', 'flex-center', 'result-header'],
      content: `<h1>${name}</h1>`,
    });

    // create section for result card
    const sectionTopDiv = actions.makeElement({
      element: 'a',
      href: `tel:+${phone1}`,
      classNames: ['flex', 'flex-evenly', 'margin-top-bottom-20', 'padding-left-right-10', 'OpenSans-ExtraBold', 'result-phone'],
      content: [
        actions.makeElement({
          element: 'img',
          classNames: ['lg-icon', 'result-icon-desktop'],
          src: 'src/assets/phone-icon-desktop.png',
        }),
        actions.makeElement({
          element: 'img',
          classNames: ['lg-icon', 'result-icon-mobile'],
          src: 'src/assets/phone-icon-mobile.png',
        }),
        actions.makeElement({
          element: 'span',
          classNames: ['result-phone-span'],
          content: 'Tap to call',
        }),
        actions.makeElement({
          element: 'p',
          content: phone1,
        }),
      ],
    });

    const sectionP = actions.makeElement({
      element: 'p',
      classNames: ['OpenSans-Italic', 'results-text'],
      content: 'Can\'t talk now? Click below to send an email.',
    });
    const sectionButton = actions.makeElement({
      element: 'button',
      classNames: ['flex-inline', 'flex-between', 'margin-top-bottom-20', 'padding-top-bottom-10', 'padding-left-right-15', 'OpenSans-Bold', 'btn', 'results-btn'],
      data: name,
      content: [
        actions.makeElement({
          element: 'img',
          classNames: ['padding-right-10', 'xs-icon'],
          src: 'src/assets/email-icon.png',
        }),
        actions.makeElement({
          element: 'p',
          content: 'Contact this Pro',
        }),
      ],
    });

    const parsedHours = data.parse.weekHours(weekHours);
    const sectionBottomLis = Object.keys(parsedHours).map(
      (day) => actions.makeElement({
        element: 'li',
        classNames: ['margin-top-10', 'OpenSans-Regular', 'result-hours-item'],
        content:`${day} ${parsedHours[day]}`,
      })
    );
    const sectionBottomDiv = actions.makeElement({
      element: 'div',
      classNames: ['margin-top-bottom-15'],
      content: [
        actions.makeElement({
          element: 'h3',
          classNames: ['OpenSans-Bold'],
          content: 'Business Hours',
        }),
        actions.makeElement({
          element: 'ul',
          content: sectionBottomLis,
        }),
      ],  
    });

    const section = actions.makeElement({
      element: 'section',
      classNames: ['margin-left-right-25', 'text-center'],
      content: [sectionTopDiv, sectionP, sectionButton, sectionBottomDiv],
    });

    // create footer for result card
    const footerLis = certifications.map(
      (cert) => actions.makeElement({
        element: 'li',
        classNames: ['padding-5', 'flex', 'flex-start', 'OpenSans-Regular', 'result-footer-item'],
        content: [
          actions.makeElement({
            element: 'img',
            classNames: ['padding-right-10', 'xs-icon'],
            src: certificationImages[cert],
          }),
          actions.makeElement({
            element: 'p',
            content: cert,
          }),
        ],
      })
    );
    const footerUl = actions.makeElement({
      element: 'footer',
      classNames: ['padding-20', 'flex', 'flex-start', 'flex-direction-column', 'flex-wrap', 'result-footer'],
      content: footerLis,
    });
    const footer = actions.makeElement({
      element: 'footer',
      classNames: ['padding-top-20', 'text-start'],
      content: [footerUl],
    });

    // return combination of all three parts in a container div
    return actions.makeElement({
      classNames: ['margin-10', 'result-card'],
      content: [header, section, footer],
    });
  },
  async showCards(event) {
    // show checked boxes on selected
    actions.markCheckbox(event);

    // get which items user would like to filter by
    const clickedBoxes = [...document.querySelectorAll('.checkbox-clicked')].map(checkbox => checkbox.dataset.certification);

    // filter list of dealers
    let filteredDealers = [];
    if (clickedBoxes.length !== 0) {
      // get filtered list of dealers
      const {
        zipcode,
        dealers,
      } = await data.get();

      const dealerList = dealers;
      filteredDealers = data.parse.filterDealers(dealerList, clickedBoxes);

      // change filter/search bar message
      actions.searchBarMsg(filteredDealers, zipcode);
    } else {
      actions.searchBarMsg([], '');
    }

    // Display result cards
    document.querySelector('.result-list').innerHTML = '';
    filteredDealers.forEach(({ data }) => {
      document.querySelector('.result-list').appendChild(actions.makeCard(data));
    });

    // add event listener
    handler.listeners.cards();
  },
  markCheckbox({ currentTarget, target }) {
    const span = currentTarget.querySelector('.checkbox');
    span.classList.toggle('checkbox-clicked');
  },
  searchBarMsg(filteredDealers = [], zipcode = '') {
    if (filteredDealers.length > 0) {
      handler.elements.searchSummary.innerHTML = `${filteredDealers.length} dealers in ${zipcode}`;
    } else {
      handler.elements.searchSummary.innerHTML = 'Customize here';
    }
  },
  toggleFilter() {
    handler.elements.fieldset.classList.toggle('filter-hide');
  }
};


const data = {
  read: function () {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', './code-test.json', true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == "200") {
        // .open will NOT return a value but simply returns undefined in async mode so use a callback
        
        // raw JSON response from server request
        var data = request.responseText;

        // parsed JSON response -> javascript object
        var dataObj = JSON.parse(data)

        actions.makeTable(dataObj);
      }
    }
    request.send(null);
  },
  get() {
    return fetch('./dealers.json')
      .then(response => response.json());
  },
  parse: {
    weekHours({mon, sat, sun}) {
      return {
        Weekdays: mon,
        Saturdays: (sat === '') ? ' - CLOSED' : (sat === 'On Call') ? ' - On Call' : sat,
        Sundays: (sun === '') ? ' - CLOSED' : (sun === 'On Call') ? ' - On Call' : sun,
      };
    },
    filterDealers(dealerList, filters) {
      return dealerList.filter(({ data }) => data.certifications.some(cert => filters.includes(cert)));
    },
  },
};


const useful = {
  truncateString: function(str, num) {
    // Clear out that junk in your trunk
    
    if (str.length <= num ) {
      return str; 
    } else if (num <= 3) {
      str = str.slice(0,num) + "...";
    } else {
      str = str.slice(0,num-3) + "...";
    }
    
    return str;
  },
  textCheckAdd: function(str,strToCheck) {
    // var expression1 = /(http|\/\/)/i;
    var expression1 = new RegExp(strToCheck, "i");
    if ( !str.match(expression1) ) {
      return str = strToCheck + "://" + str;
    } else {
      return str;
    }
  },
  textCheckRemove: function(str,strToCheck) {
    // var expression1 = /(http|\/\/)/i;
    var expression1 = new RegExp(strToCheck, "i");
    return str.replace(expression1,"");
  },
  regexEscape: function(str) {
    // function to escape special characters when not done properly
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  },
	padZero: function(num) {
		num = parseInt(num);
    if (num < 10) {
			num = "0" + num;
    }
    return num;
	},
	padDecimals: function(num) {
		num = parseInt(num);
    if (num === Math.floor(num)) {
			num = num + ".00" ;
    }
    return num;
	},
	time: function() {
		// returns current time in hrs:min:sec (24-hour format)
		
    var date = new Date();
    var hrs = this.padZero(date.getHours());
    var min = this.padZero(date.getMinutes());
    var sec = this.padZero(date.getSeconds());
		
		var currentTime = hrs + ":" + min + ":" + sec;
    return currentTime;
  },
  objectSort: function (property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  },
  scrollToElement(element) {
    element.scrollIntoView({
      behavior: 'smooth'
    });
  },
  scrollToPosition(y) {
    document.body.scrollIntoView({
      y,
      block: 'start',
      behavior: 'smooth'
    });
  }
};


handler.listeners.initialize();
