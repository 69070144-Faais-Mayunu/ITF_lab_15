const foods = [
  {
    name: "ข้าวกะเพราหมูสับไข่ดาว",
    category: "จานเดียว",
    description: "หมูสับผัดใบกะเพรารสจัดจ้าน หอมพริกและกระเทียม เสิร์ฟพร้อมข้าวสวยร้อนๆ กับไข่ดาวขอบกรอบ",
    price: 65,
    rating: "4.9",
    image: "assets/kra-pao.jpg",
    alt: "ข้าวกะเพราหมูสับไข่ดาว",
    position: "center 56%"
  },
  {
    name: "ไก่ย่าง",
    category: "เมนูย่าง",
    description: "ไก่หมักสมุนไพรย่างจนหนังหอมกรอบ เนื้อนุ่มชุ่มฉ่ำ กินคู่กับน้ำจิ้มแจ่วรสเปรี้ยวเผ็ด",
    price: 89,
    rating: "4.8",
    image: "assets/gai-yang.jpg",
    alt: "ไก่ย่างสมุนไพรพร้อมน้ำจิ้ม",
    position: "center 46%"
  },
  {
    name: "บะหมี่ขาหมู",
    category: "เมนูเส้น",
    description: "เส้นบะหมี่ไข่เหนียวนุ่มในน้ำซุปหอมเครื่องยาจีน พร้อมขาหมูพะโล้เปื่อยยุ่ยและไข่ต้ม",
    price: 79,
    rating: "4.7",
    image: "assets/ba-mee.jpg",
    alt: "บะหมี่ไข่ในน้ำซุปพร้อมหมูและไข่",
    position: "center 53%"
  },
  {
    name: "ข้าวมันไก่",
    category: "จานเดียว",
    description: "ไก่ต้มนุ่มหอมน้ำมันขิง บนข้าวสวยหอมมัน เสิร์ฟพร้อมน้ำจิ้มเต้าเจี้ยวและแตงกวาสด",
    price: 59,
    rating: "4.9",
    image: "assets/khao-man-gai.jpg",
    alt: "ข้าวมันไก่พร้อมน้ำจิ้มและน้ำซุป",
    position: "center 52%"
  },
  {
    name: "ข้าวไก่กระเทียม",
    category: "จานเดียว",
    description: "ไก่ผัดซอสกระเทียมเข้มข้น โรยกระเทียมเจียวกรอบๆ เสิร์ฟพร้อมข้าวสวยและผักเคียง",
    price: 75,
    rating: "4.8",
    image: "assets/khao-kai-garlic.jpg",
    alt: "ข้าวไก่กระเทียมซอสเข้มข้น",
    position: "center 48%"
  }
];

const rollMessages = [
  "ได้เลย! เมนูนี้แหละ",
  "วันนี้กินนี่แหละ!",
  "จัดไปเลยจานนี้",
  "อร่อยแน่นอน เชื่อสิ!"
];

const card = document.querySelector(".food-card");
const foodImage = document.querySelector("#foodImage");
const foodCategory = document.querySelector("#foodCategory");
const foodRating = document.querySelector("#foodRating");
const foodName = document.querySelector("#foodName");
const foodDescription = document.querySelector("#foodDescription");
const foodPrice = document.querySelector("#foodPrice");
const currentNumber = document.querySelector("#currentNumber");
const menuGrid = document.querySelector("#menuGrid");
const randomButton = document.querySelector("#randomButton");
const buttonLabel = document.querySelector("#buttonLabel");
const rollStatus = document.querySelector("#rollStatus");
const rollCount = document.querySelector("#rollCount");
const liveRegion = document.querySelector("#liveRegion");
const header = document.querySelector(".site-header");
const menuSection = document.querySelector("#menu-list");
const footer = document.querySelector("#about");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentIndex = 0;
let rolls = 0;
let isRolling = false;

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function createMenuTiles() {
  menuGrid.innerHTML = foods.map((food, index) => `
    <button class="menu-tile" type="button" data-index="${index}" aria-pressed="false" aria-label="ดูเมนู ${food.name} ราคา ${food.price} บาท">
      <span class="menu-tile-media">
        <img src="${food.image}" alt="${food.alt}" loading="${index > 2 ? "lazy" : "eager"}" decoding="async" style="object-position: ${food.position}">
        <span class="menu-tile-number">${padNumber(index + 1)}</span>
      </span>
      <span class="menu-tile-body">
        <span class="menu-tile-category">${food.category}</span>
        <span class="menu-tile-name">${food.name}</span>
        <span class="menu-tile-foot">
          <span class="menu-tile-price">฿${food.price}<small>/ จาน</small></span>
          <span class="menu-tile-arrow" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M5 15 15 5M7.5 5H15v7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
      </span>
    </button>
  `).join("");
}

function updateActiveTile(index) {
  const tiles = [...menuGrid.querySelectorAll(".menu-tile")];

  tiles.forEach((tile, tileIndex) => {
    const isActive = tileIndex === index;
    tile.classList.toggle("is-active", isActive);
    tile.setAttribute("aria-pressed", String(isActive));
  });
}

function renderFood(index, message = "") {
  const food = foods[index];

  foodImage.src = food.image;
  foodImage.alt = food.alt;
  foodImage.style.objectPosition = food.position;
  foodCategory.textContent = food.category;
  foodRating.textContent = food.rating;
  foodName.textContent = food.name;
  foodDescription.textContent = food.description;
  foodPrice.textContent = food.price;
  currentNumber.textContent = padNumber(index + 1);
  updateActiveTile(index);

  if (message) {
    liveRegion.textContent = message;
  }

  currentIndex = index;
}

function getRandomIndex() {
  return (currentIndex + 1 + Math.floor(Math.random() * (foods.length - 1))) % foods.length;
}

function scrollToCard() {
  const behavior = reduceMotion.matches ? "auto" : "smooth";
  document.querySelector("#randomizer").scrollIntoView({ behavior, block: "center" });
}

function selectFood(index, source = "random") {
  if (isRolling || index === currentIndex) {
    return;
  }

  isRolling = true;
  card.classList.add("is-switching");
  randomButton.disabled = true;
  randomButton.classList.add("is-rolling");
  buttonLabel.textContent = "กำลังเลือก...";
  rollStatus.textContent = "กำลังเลือกเมนูที่ใช่...";

  const delay = reduceMotion.matches ? 20 : 300;

  window.setTimeout(() => {
    const food = foods[index];
    const announcement = source === "random"
      ? `ได้เมนู ${food.name} ราคา ${food.price} บาท`
      : `เลือกเมนู ${food.name} ราคา ${food.price} บาท`;

    renderFood(index, announcement);
    card.classList.remove("is-switching");

    if (source === "random") {
      rolls += 1;
      rollCount.textContent = `สุ่มแล้ว ${rolls} ครั้ง`;
      rollStatus.textContent = rollMessages[Math.floor(Math.random() * rollMessages.length)];
    } else {
      rollStatus.textContent = "แสดงเมนูที่เลือกแล้ว";
    }

    buttonLabel.textContent = "สุ่มเมนูอีกครั้ง";
    randomButton.disabled = false;
    randomButton.classList.remove("is-rolling");
    isRolling = false;

    if (source === "menu") {
      window.setTimeout(scrollToCard, reduceMotion.matches ? 0 : 120);
    }
  }, delay);
}

function handleRandom() {
  if (isRolling) {
    return;
  }

  selectFood(getRandomIndex(), "random");
}

function handleMenuSelection(event) {
  const tile = event.target.closest(".menu-tile");

  if (!tile || isRolling) {
    return;
  }

  const index = Number(tile.dataset.index);

  if (index === currentIndex) {
    scrollToCard();
    return;
  }

  selectFood(index, "menu");
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function updateNav() {
  const marker = window.scrollY + 170;
  const menuTop = menuSection.offsetTop;
  const footerTop = footer.offsetTop;
  let activeHref = "#home";

  if (marker >= footerTop) {
    activeHref = "#about";
  } else if (marker >= menuTop) {
    activeHref = "#menu-list";
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === activeHref);
  });
}

function handleScroll() {
  updateHeader();
  updateNav();
}

function preloadImages() {
  foods.forEach((food) => {
    const image = new Image();
    image.src = food.image;
  });
}

createMenuTiles();
renderFood(0);
updateHeader();
updateNav();

randomButton.addEventListener("click", handleRandom);
menuGrid.addEventListener("click", handleMenuSelection);
window.addEventListener("scroll", handleScroll, { passive: true });

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(preloadImages);
} else {
  window.setTimeout(preloadImages, 700);
}
