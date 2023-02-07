console.log(`1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50
2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50
3. В разделе contacts реализован select с выбором городов +25
Итого: 125`);

(function () {
	const hamburger = document.querySelector('.hamburger');
	const nav = document.querySelector('.header__navigation');
	const links = document.querySelectorAll('.navigation__link');
	const body = document.querySelector('body');
	const overflow = document.querySelector('.overflow');

	let hamburgerState = false;

	hamburger.addEventListener('click', () => {
		(hamburgerState) ? hamburgerState = false : hamburgerState = true;
		openCloseHamburger();
	})

	overflow.addEventListener('click', () => {
		hamburgerState = false;
		openCloseHamburger();
	})

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', () => {
			hamburgerState = false;
			openCloseHamburger();
		});
	}

	function openCloseHamburger() {
		if (hamburgerState === true) {
			nav.classList.add('header__navigation_active');
			hamburger.classList.add('hamburger_active');
			body.classList.add('body_lock');
			overflow.classList.add('overflow_active');
		} else {
			nav.classList.remove('header__navigation_active');
			hamburger.classList.remove('hamburger_active');
			body.classList.remove('body_lock');
			overflow.classList.remove('overflow_active');
		}
	}
}());

(function () {
	const serviceBTNS = document.querySelectorAll('.service__button');
	const serviceCards = document.querySelectorAll('.service-item');

	let activeButtonsCounter = 0;
	let activeBTNFrom0to1 = false;

	function activeBTN (btn) {
		if (btn.classList.contains('button-active')) {
			btn.classList.toggle('button-active');
			activeButtonsCounter -= 1;
			activeBTNFrom0to1 = false;
		} else if (activeButtonsCounter < 2) {
			btn.classList.toggle('button-active');
			activeButtonsCounter += 1;
			if (activeButtonsCounter === 1) {
				activeBTNFrom0to1 = true;
			}
		}
	}

	function activeCard (btnName, btnActive) {
		if (activeButtonsCounter === 0) {
			serviceCards.forEach(card => {
				card.classList.remove('service-item_unactive');
			})
		} else if (activeBTNFrom0to1) {
			serviceCards.forEach(card => {
				card.classList.add('service-item_unactive');
			})
			activeBTNFrom0to1 = false;
			serviceCards.forEach(card => {
				if (card.classList.contains(btnName)) {
					if (btnActive) {
						card.classList.remove('service-item_unactive');
					} else {
						card.classList.add('service-item_unactive');
					}
				}
			})
		} else {
			serviceCards.forEach(card => {
				if (card.classList.contains(btnName)) {
					if (btnActive) {
						card.classList.remove('service-item_unactive');
					} else {
						card.classList.add('service-item_unactive');
					}
				}
			})
		}
	}

	serviceBTNS.forEach(btn => {
		btn.addEventListener('click', () => {
			if (btn.outerText === 'Gardens') {
				activeBTN(btn);
				activeCard(btn.outerText.toLowerCase(), btn.classList.contains('button-active'));
			} else if (btn.outerText === 'Lawn') {
				activeBTN(btn);
				activeCard(btn.outerText.toLowerCase(), btn.classList.contains('button-active'));
			} else if (btn.outerText === 'Planting') {
				activeBTN(btn);
				activeCard(btn.outerText.toLowerCase(), btn.classList.contains('button-active'));
			}
		})
	})
}());

(function () {
	const pricesItems = document.querySelectorAll('.prices-list__title');

	let openItem = false;

	pricesItems.forEach(item => {
		item.addEventListener('click', () => {
			if (!openItem) {
				item.parentElement.classList.toggle('prices-list__accordion_opened');
				openItem = true;
			} else if (item.parentElement.classList.contains('prices-list__accordion_opened')) {
				item.parentElement.classList.remove('prices-list__accordion_opened');
				openItem = false;
			} else {
				pricesItems.forEach(closeItem => {
					closeItem.parentElement.classList.remove('prices-list__accordion_opened');
				})
				item.parentElement.classList.toggle('prices-list__accordion_opened');
				openItem = true;
			}
		})
	})
}())

(function () {
	const titleSelect = document.querySelector('.multiple-accoddion__title');
	const cityCard = document.querySelector('.city-card');
	const titleTownSelect = document.querySelector('.multiple-accoddion__title span:nth-child(1)');
	const townsList = document.querySelectorAll('.multiple-accoddion__town');

	const Yonkers = {
		city: 'Yonkers, NY',
		phone: '+1	914	678 0003',
		adress: '511 Warburton Ave',
	}
	const Canandaigua = {
		city: 'Canandaigua, NY',
		phone: '+1	585	393 0001',
		adress: '151 Charlotte Street',
	}
	const Sherrill = {
		city: 'Sherrill, NY',
		phone: '+1	315	908 0004',
		adress: '14 WEST Noyes BLVD',
	}
	const NY = {
		city: 'New York City',
		phone: '+1	212	456 0002',
		adress: '9 East 91st Street',
	}

	let selectedTown = '';

	titleSelect.addEventListener('click', () => {
		titleSelect.parentElement.classList.toggle('contacts__multiple-accoddion_active');
		if (selectedTown && !titleSelect.parentElement.classList.contains('contacts__multiple-accoddion_active')) {
			cityCard.classList.add('city-card__active');
		} else {
			cityCard.classList.remove('city-card__active');
		}
	})

	townsList.forEach(town => {
		town.addEventListener('click', () => {
			selectedTown = town.innerText;
			selectTown();
			titleSelect.parentElement.classList.toggle('contacts__multiple-accoddion_active');
			titleTownSelect.innerText = selectedTown;
			cityCard.classList.add('city-card__active');
			if (selectedTown) {
				titleSelect.classList.add('multiple-accoddion__title_selected');
				document.querySelector('.contacts__title').classList.add('contacts__title_selected');
				document.querySelector('.contacts__content').classList.add('contacts__content_selected');
				document.querySelector('.contacts__image').classList.add('contacts__image_selected');
			}
		})
	})

	function selectTown () {
		if (selectedTown === 'Yonkers, NY') {
			cityCard.querySelector('.city-card__city').innerHTML = Yonkers.city;
			cityCard.querySelector('.city-card__phone').innerHTML = Yonkers.phone;
			cityCard.querySelector('.city-card__adress').innerHTML = Yonkers.adress;
			cityCard.querySelector('.city-card__button').href = `tel:${Yonkers.phone}`;

		} else if (selectedTown === 'Canandaigua, NY') {
			cityCard.querySelector('.city-card__city').innerHTML = Canandaigua.city;
			cityCard.querySelector('.city-card__phone').innerHTML = Canandaigua.phone;
			cityCard.querySelector('.city-card__adress').innerHTML = Canandaigua.adress;
			cityCard.querySelector('.city-card__button').href = `tel:${Canandaigua.phone}`;
		} else if (selectedTown === 'Sherrill, NY') {
			cityCard.querySelector('.city-card__city').innerHTML = Sherrill.city;
			cityCard.querySelector('.city-card__phone').innerHTML = Sherrill.phone;
			cityCard.querySelector('.city-card__adress').innerHTML = Sherrill.adress;
			cityCard.querySelector('.city-card__button').href = `tel:${Sherrill.phone}`;
		} else if (selectedTown === 'New York City') {
			cityCard.querySelector('.city-card__city').innerHTML = NY.city;
			cityCard.querySelector('.city-card__phone').innerHTML = NY.phone;
			cityCard.querySelector('.city-card__adress').innerHTML = NY.adress;
			cityCard.querySelector('.city-card__button').href = `tel:${NY.phone}`;
		}
	}
}())