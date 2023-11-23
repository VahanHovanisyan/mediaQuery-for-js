class DynamicAdaptElement {
	constructor(element, moveClass, position = 'last', breakpoint, width) {
		this.element = element;
		this.moveClass = moveClass;
		this.position = position;
		this.breakpoint = breakpoint;
		this.width = width;
		this.originalIndex = this.indexInParent();
		this.originalParent = this.element.parentNode;
		this.destination = document.querySelector('.' + this.moveClass);
		this.classname = `_dynamic_adapt_${this.breakpoint}`;
	}

	indexInParent() {
		return Array.from(this.element.parentNode.children).indexOf(this.element);
	}

	moveToDestination() {
		const actualIndex = this.position === 'last' ? -1 : 0;
		this.destination.insertBefore(this.element, this.destination.children[actualIndex]);
		this.element.classList.add(this.classname);
	}

	moveBackToOriginal() {
		this.originalParent.insertBefore(this.element, this.originalParent.children[this.originalIndex]);
		this.element.classList.remove(this.classname);
	}

	returnToOriginalPosition() {
		if (this.element.classList.contains(this.classname)) {
			this.moveBackToOriginal();
		}
	}

	applyMediaQuery(mediaQuery) {
		if (mediaQuery.matches) {
			if (!this.element.classList.contains(this.classname)) {
				this.moveToDestination();
			}
		} else {
			this.returnToOriginalPosition();
		}
	}
}

class DynamicAdapt {
	constructor(elements) {
		this.elements = elements.map((element) => new DynamicAdaptElement(element.element, element.moveClass, element.position, element.breakpoint, element.width));
		this.matchMediaList = this.elements.map((el) => window.matchMedia(`(${el.width}-width: ${el.breakpoint}px)`));
		this.matchMediaList.forEach((media, index) => media.addListener(() => this.elements[index].applyMediaQuery(media)));
		this.init();
	}

	init() {
		this.elements.forEach((element) => element.applyMediaQuery(this.matchMediaList[this.elements.indexOf(element)]));
	}
}

// usage
// const elementsData = [
// 	{ element: document.getElementById('title'), moveClass: 'box', position: 'last', breakpoint: 768, width: 'max' },
// ];

// const dynamicAdaptInstance = new DynamicAdapt(elementsData);
















// class DynamicAdaptElement {
// 	constructor(callback, moveClass, position = 'last', breakpoint = 768) {
// 			this.callback = callback;
// 			this.moveClass = moveClass;
// 			this.position = position;
// 			this.breakpoint = breakpoint;
// 			this.originalIndex = this.indexInParent();
// 			this.originalParent = this.getParent();
// 			this.destination = document.querySelector('.' + this.moveClass);
// 			this.classname = `_dynamic_adapt_${this.breakpoint}`;
// 	}

// 	indexInParent() {
// 			return Array.from(this.getParent().children).indexOf(this.callback());
// 	}

// 	getParent() {
// 			return this.callback().parentNode;
// 	}

// 	moveToDestination() {
// 			const actualIndex = this.position === 'last' ? -1 : 0;
// 			this.destination.insertBefore(this.callback(), this.destination.children[actualIndex]);
// 			this.callback().classList.add(this.classname);
// 	}

// 	moveBackToOriginal() {
// 			this.originalParent.insertBefore(this.callback(), this.originalParent.children[this.originalIndex]);
// 			this.callback().classList.remove(this.classname);
// 	}

// 	returnToOriginalPosition() {
// 			if (this.callback().classList.contains(this.classname)) {
// 					this.moveBackToOriginal();
// 			}
// 	}

// 	applyMediaQuery(mediaQuery) {
// 			if (mediaQuery.matches) {
// 					if (!this.callback().classList.contains(this.classname)) {
// 							this.moveToDestination();
// 					}
// 			} else {
// 					this.returnToOriginalPosition();
// 			}
// 	}
// }

// class DynamicAdapt {
// 	constructor(elements) {
// 			this.elements = elements.map((element) => new DynamicAdaptElement(element.callback, element.moveClass, element.position, element.breakpoint));
// 			this.matchMediaList = this.elements.map((el) => window.matchMedia(`(max-width: ${el.breakpoint}px)`));
// 			this.matchMediaList.forEach((media, index) => media.addListener(() => this.elements[index].applyMediaQuery(media)));
// 			this.init();
// 	}

// 	init() {
// 			this.elements.forEach((element) => element.applyMediaQuery(this.matchMediaList[this.elements.indexOf(element)]));
// 	}
// }

// // Example: Define your elements and their properties
// const elementsData = [
// 	{ callback: () => document.getElementById('title'), moveClass: 'box', position: 'last', breakpoint: 768},
// 	// Add more elements as needed
// ];

// // Instantiate the DynamicAdapt class with the defined elements
// const dynamicAdaptInstance = new DynamicAdapt(elementsData);
