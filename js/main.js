const header = document.getElementById("header");
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const form = document.getElementById("callback-form");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");
const phoneInput = form.querySelector('input[name="phone"]');

year.textContent = new Date().getFullYear();

burger.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
  });
});

phoneInput.addEventListener("input", () => {
  const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
  const rest = digits.startsWith("8") ? `7${digits.slice(1)}` : digits.startsWith("7") ? digits : `7${digits}`;
  const d = rest.slice(0, 11);
  let formatted = "+7";
  if (d.length > 1) formatted += ` (${d.slice(1, 4)}`;
  if (d.length >= 4) formatted += `) ${d.slice(4, 7)}`;
  if (d.length >= 7) formatted += `-${d.slice(7, 9)}`;
  if (d.length >= 9) formatted += `-${d.slice(9, 11)}`;
  phoneInput.value = formatted;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.hidden = true;
  formSuccess.hidden = true;

  const name = form.name.value.trim();
  const phone = form.phone.value.replace(/\D/g, "");

  if (!name) {
    formError.textContent = "Укажите имя.";
    formError.hidden = false;
    return;
  }

  if (phone.length < 11) {
    formError.textContent = "Укажите корректный номер телефона.";
    formError.hidden = false;
    return;
  }

  form.reset();
  formSuccess.hidden = false;
});
