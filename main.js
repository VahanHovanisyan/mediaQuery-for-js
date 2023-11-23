const title = document.querySelector('.title')
const box = document.querySelector('.box')
const originalParent = title.parentNode;
const mediaQuery = new MediaQueryHandler({
  width: "min",
  breakpoint: 768,
  trueChange: (instance) => {
    title.textContent = `Media query (${instance.mediaQuery.media}) matched.`
    // box.append(title);
    console.log(`Media query (${instance.mediaQuery.media}) matched.`);
  },
  falseChange: (instance) => {
    title.textContent = `Media query (${instance.mediaQuery.media}) unmatched.`
    // originalParent.prepend(title);
    console.log(`Media query (${instance.mediaQuery.media}) unmatched.`);
  },
});

const elementsData = [
	{ element: document.getElementById('title'), moveClass: 'box', position: 'last', breakpoint: 768, width: 'max' },
];

const dynamicAdaptInstance = new DynamicAdapt(elementsData);