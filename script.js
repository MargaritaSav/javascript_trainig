const formSearch = document.querySelector('.form-search'),
	inputCitiesFrom = document.querySelector('.input__cities-from'),
	dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
	inputCitiesTo = document.querySelector('.input__cities-to'),
	dropdownCitiesTo = document.querySelector('.dropdown__cities-to');


//Данные

const citiesAPI = 'http://api.travelpayouts.com/data/ru/cities.json',
	proxy = 'https://cors-anywhere.herokuapp.com/',
	api_key = '611ace80c16d40531468c3ce4fa227ae',
	calendar = new URL('http://min-prices.aviasales.ru/calendar_preload'); 

let city = [];

 
 //Функции
 const getData = (url, callback)=>{
 	const request = new XMLHttpRequest();
 	request.open('GET', url);

 	request.addEventListener('readystatechange', ()=>{
 		if(request.readyState!==4) return;

 		if(request.status === 200){
 			callback(request.response);

 		} else{
 			console.error(request.status)
 		}
 	})

 	request.send();
 };

 const showCity = (input, list)=>{
 	list.textContent = '';

 	if (input.value === "") return;

	 	const filterCity = city.filter((item)=>{
	 		const fixItem = item.name.toLowerCase();
	 		return fixItem.includes(input.value.toLowerCase());	
	 		
	 	});

	 	filterCity.forEach((item)=>{
	 		const li  = document.createElement('li');
	 		li.classList.add('dropdown__city');
	 		li.textContent = item.name;
	 		list.append(li);
	 	});
 };

 const autoComplete = (event, input, dropdown) => {
	const target = event.target;
 	if(target.tagName.toLowerCase() === 'li'){
 		input.value = target.textContent;
 		dropdown.textContent = "";
 	}
 }

 inputCitiesFrom.addEventListener('input', ()=>{
 	showCity(inputCitiesFrom, dropdownCitiesFrom);
});

 dropdownCitiesFrom.addEventListener('click', (event)=>{
 	autoComplete(event, inputCitiesFrom, dropdownCitiesFrom);
 });

 inputCitiesTo.addEventListener('input', ()=>{
 	showCity(inputCitiesTo, dropdownCitiesTo);
});

 dropdownCitiesTo.addEventListener('click', (event) => {
 	autoComplete(event, inputCitiesTo, dropdownCitiesTo);
 });


 getData(proxy + citiesAPI, (data) => {
 	city = JSON.parse(data).filter(item => item.name);
 })

//Задаем get-параметры для url
calendar.searchParams.set('origin', 'SVX');
calendar.searchParams.set('destination', 'KGD');
calendar.searchParams.set('depart_date', '2020-05-25');
calendar.searchParams.set('one_way ', 'true');

//Отправляем запрос
getData(calendar, (data) => {
 	console.log(data);
 })