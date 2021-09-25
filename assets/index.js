let testimonials = document.querySelector("#testimonials");
const DATE = document.querySelector("#date");
const BUTTON = document.querySelectorAll("button");
let initSlide = 0;

DATE.innerHTML = new Date().getFullYear();

window.addEventListener("load", () => {
  fetch("assets/testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      const testimonials = Object.keys(data);
      testimonials.map((testimonial, i) => {
        if (i < 3) {
          initCarousel = i;
          displayTestimonials(data[testimonial]);
        }
      });
    })
    .catch((error) => console.log(error));
});

BUTTON.forEach((element) => {
  element.addEventListener("click", () => {
    // initSlide += parseInt(element.dataset.slide);
    // displayTestimonials(data[initSlide]);

    fetch(`assets/testimonials.json`)
      .then((response) => response.json())
      .then((data) => {
        const TESTIMONIALS = Object.keys(data);
        if (element.id === "prev") {
          if (initSlide > 0) {
            initSlide -= 3;
            testimonials.innerHTML = "";
            TESTIMONIALS.map((testimonial, i) => {
              if (initSlide <= i && initSlide >= i - 2) {
                displayTestimonials(data[testimonial]);
              }
            });
          }
        } else {
          if (initSlide < TESTIMONIALS.length - 3) {
            initSlide += 3;
            testimonials.innerHTML = "";
            TESTIMONIALS.map((testimonial, i) => {
              if (initSlide <= i && initSlide >= i - 2) {
                displayTestimonials(data[testimonial]);
              }
            });
          }
        }
      })
      .catch((error) => console.log(error));
  });
});

function displayTestimonials(data) {
  testimonials.innerHTML += `
  <div class="py-12 px-4 sm:px-6 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 md:border-indigo-900 lg:pr-16">
    <blockquote class="mt-6 md:flex-grow md:flex md:flex-col">
      <div class="relative text-lg font-medium text-white md:flex-grow">
        <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-yellow-700" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p class="relative">
          ${data.content}
        </p>
      </div>
      <p class="relative flex ">
          ${displayStars(data.stars)}
        </p>
    </blockquote>
  </div>`;
}

function displayStars(count) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += `<svg class="h-4 w-4 text-yellow-500 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
  }
  return stars;
}
