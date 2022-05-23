// $("#carousel").owlCarousel({
// 	// autoplay: true,
// 	rewind: true /* use rewind if you don't want loop */,
// 	/*
//     animateOut: 'fadeOut',
//     animateIn: 'fadeIn',
//     */
// 	responsiveClass: true,
// 	autoHeight: true,
// 	// autoplayTimeout: 7000,
// 	smartSpeed: 800,
// 	nav: true,
// 	responsive: {
// 		0: {
// 			items: 1,
// 		},
// 		481: {
// 			items: 2,
// 		},
// 		600: {
// 			items: 3,
// 		},
// 		1024: {
// 			items: 4,
// 		},

// 		1366: {
// 			items: 6,
// 		},
// 	},
// });

//Accordion

const accordionItemHeaders = document.querySelectorAll(
	".accordion-item-header",
);

accordionItemHeaders.forEach((accordionItemHeader) => {
	accordionItemHeader.addEventListener("click", (event) => {
		accordionItemHeader.classList.toggle("active");
		const accordionItemBody = accordionItemHeader.nextElementSibling;
		if (accordionItemHeader.classList.contains("active")) {
			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
		} else {
			accordionItemBody.style.maxHeight = 0;
		}
	});
});

//Add to Cart

let carts = document.querySelectorAll(".btn-1");
let addCarts = document.querySelector(".cart");

let products = [
	{
		name: "Hats FLEXFIT",
		tag: "men hat",
		price: 55,
		inCart: 0,
	},
	{
		name: "Leather Jackets",
		tag: "men jacket",
		price: 60,
		inCart: 0,
	},
];

carts.forEach((cart, i) => {
	cart.addEventListener("click", () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	});
});

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem("cartNumbers");
	if (productNumbers) {
		addCarts.textContent = productNumbers;
	}
}

function cartNumbers(product) {
	let productNumbers = localStorage.getItem("cartNumbers");

	productNumbers = parseInt(productNumbers);
	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers + 1);
		addCarts.textContent = productNumbers + 1;
	} else {
		localStorage.setItem("cartNumbers", 1);
		addCarts.textContent = 1;
	}
	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);

	if (cartItems !== null) {
		if (cartItems[product.tag] === undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product,
			};
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;

		cartItems = {
			[product.tag]: product,
		};
	}

	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem("totalCost");

	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem("totalCost");

	if (cartItems && productContainer) {
		productContainer.innerHTML = "";
		Object.values(cartItems).map((item) => {
			productContainer.innerHTML += `
			<div class="product">
			<img src="${item.tag}.png">
			<span>${item.name}</span>
			</div>
			<div class="price">$${item.price},00</div>
			<div clas="quantity'> 
			<span class="incart-2">${item.inCart}</span>
			<div class="total">
			$${item.inCart * item.price},00
			</div>
			</div>
			`;
		});

		productContainer.innerHTML += `
		<div class="basketTotalContainer">
		<h4 class="basketTotaltitle">
			Basket Total
			</h4>
			<h4 class="basketTotal">
				$${cartCost},00
			</h4>
		`;
	}
}

onLoadCartNumbers();
displayCart();

// slideshow javascript automatic

let counter = 1;

setInterval(() => {
	document.getElementById("radio" + counter).checked = true;
	counter++;
	if (counter > 4) {
		counter = 1;
	}
}, 2000);


$(document).ready(() => {


	/******************/
	/*** START CHAT ***/
	/******************/


	// set visitor name
	let $userName = "";

	// start chatbox
	$("#form-start").on("submit", (event) => {
		event.preventDefault();
		$userName = $("#username").val();
		$("#landing").slideUp(1000);
		setTimeout(() => {
			$("#start-chat").html("Continue chat")
		}, 1000);
	});




	/*****************/
	/*** USER CHAT ***/
	/*****************/


	// Post a message to the board
	function $postMessage() {
		// $("#message").find("br").remove();
		let $message = $("#message").html().trim(); // get text from text box
		$message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();
		if ($message) { // if text is not empty
			const html = `<div class="post post-user">${$message + timeStamp()}</span></div>`; // convert post to html
			$("#message-board").append(html); // add post to board
			$scrollDown(); // stay at bottom of chat
			botReply($message);
		};
		$("#message").empty();
	};

	// Chat input
	$("#message").on("keyup", (event) => {
		if (event.which === 13) $postMessage(); // Use enter to send
	}).on("focus", () => {
		$("#message").addClass("focus");
	}).on("blur", () => {
		$("#message").removeClass("focus");
	});
	$("#send").on("click", $postMessage);




	/**********************/
	/*** AUTO REPLY BOT ***/
	/**********************/


	function botReply(userMessage) {
		const reply = generateReply(userMessage);
		if (typeof reply === "string") postBotReply(reply);
		else reply.forEach((str) => postBotReply(str));
	};

	function generateReply(userMessage) {
		const message = userMessage.toLowerCase();
		let reply = [`Sorry, I don't understand you.`, `Please try again`];

		// Generate some different replies
		if (/^hi$|^hell?o|^howdy|^hoi|^hey|^ola/.test(message)) reply = [`Hi ${$userName}`, `What can I do for you?`];
		else if (/test/.test(message)) reply = [`Ok`, `Feel free to test as much as you want`];
		else if (/help|sos|emergency|support/.test(message)) reply = [`I am here to help.`, `What seems to be the problem?`];
		else if (/class\=\"fa/.test(message)) reply = [`I see you've found the smileys`, `Cool! <span class="far fa-grin-beam fa-2x"></span>`, `Did you need something?`];
		else if (/how|what|why/.test(message)) reply = userMessage + " what?";
		else if (/^huh+|boring|lame|wtf|pff/.test(message)) reply = [`<span class="far fa-dizzy fa-2x"></span>`, `I'm sorry you feel that way`, `How can I make it better?`];
		else if (/bye|ciao|adieu|salu/.test(message)) reply = [`Ok, bye :)`];

		return reply;
	};

	function postBotReply(reply) {
		const html = `<div class="post post-bot">${reply + timeStamp()}</div>`;
		const timeTyping = 500 + Math.floor(Math.random() * 2000);
		$("#message-board").append(html);
		$scrollDown();
	};



	/******************/
	/*** TIMESTAMPS ***/
	/******************/


	function timeStamp() {
		const timestamp = new Date();
		const hours = timestamp.getHours();
		let minutes = timestamp.getMinutes();
		if (minutes < 10) minutes = "0" + minutes;
		const html = `<span class="timestamp">${hours}:${minutes}</span>`;
		return html;
	};
	/*********************/
	/*** SCROLL TO END ***/
	/*********************/


	function $scrollDown() {
		const $container = $("#message-board");
		const $maxHeight = $container.height();
		const $scrollHeight = $container[0].scrollHeight;
		if ($scrollHeight > $maxHeight) $container.scrollTop($scrollHeight);
	}
});









