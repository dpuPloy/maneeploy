class Deck {
  #cards = [];

  constructor() {
    const suites = "spade,heart,club,diamond".split(",");
    const marks = "A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
    for (let s of suites) {
      for (let m of marks) {
        this.#cards.push({ mark: m, suite: s });
      }
    }
  }

  deal() {
    return this.#cards;
  }

  shuffle() {
    this.#cards.sort((a, b) => Math.random() - 0.5);
  }
}

function doDeal() {
  deck_area.innerHTML = "";
  for (let card of deck.deal()) {
    deck_area.innerHTML += `<div class="deck-card m${card.mark} ${card.suite}"></div>`;
  }
}

function doShuffle() {
  deck.shuffle();
  doDeal();
}

function doReset() {
  deck = new Deck();
  doDeal();
}

function factorial(num) {
  if (num == 0) {
    return 1n;
  } else {
    return BigInt(num) * factorial(num - 1);
  }
}

function calCombination() {
  const r = combSize.value;
  combSizeLabel.innerHTML = r;
  const amount = factorial(52) / (factorial(52 - r) * factorial(r));
  amountComb.innerHTML = amount.toLocaleString("th-TH");
  combId.setAttribute("max", amount);
  combId.value = amount;
  calPermutation();
  selCombination();
}

function selCombination() {
  const id = combId.value;
  combIdLabel.innerHTML = id;
  combination = [];
  const r = +combSize.value;
  let limit = 52 - r + 1;
  let remain = id - 1;
  const cards = deck.deal();
  let choices = cards.slice(0, limit - 1);
  for (let i = 0; i < r; i++) {
    choices = choices.reduce((prev, curr) => {
      if (!combination.includes(curr)) prev.push(curr);
      return prev;
    }, []);
    choices.push(cards[limit - 1 + i]);
    if (i == r - 1) {
      combination[i] = choices[remain];
    } else {
      const part = limit ** (r - 1 - i);
      combination[i] = choices[Math.floor(remain / part)];
      remain = remain % part;
    }
  }
  selPermutation();
}

function selPermutation() {
  const n = combSize.value;
  let id = permId.value;
  permIdLabel.innerHTML = id;
  if (Number.isInteger(+id) && (id = BigInt(id)) >= 1n && id <= max_perm) {
    permId.classList.remove("is-invalid");
    permutationArea.innerHTML = "";
    const cards = Array.from(combination);
    let remain = id - 1n;
    for (let i = 1; i < n; i++) {
      const nfact = factorial(n - i);
      const index = remain / nfact;
      const card = cards[index];
      permutationArea.innerHTML += `<div class="deck-card m${card.mark} ${card.suite}"></div>`;
      cards.splice(index.toString(), 1);
      remain = remain % nfact;
    }
    const card = cards[remain];
    permutationArea.innerHTML += `<div class="deck-card m${card.mark} ${card.suite}"></div>`;
  } else {
    permId.classList.add("is-invalid");
  }
}

function calPermutation() {
  const n = combSize.value;
  permSizeLabel.innerHTML = n;
  max_perm = factorial(n);
  amountPerm.innerHTML = max_perm.toLocaleString("th-TH");
  permId.value = max_perm;
  permIdLabel.innerHTML = max_perm;
  maxPermIdLabel.innerHTML = max_perm;
}

let deck = new Deck();
let max_perm;
const deck_area = document.getElementById("deck-area");
const combSizeLabel = document.getElementById("comb_size_label");
const combSize = document.getElementById("comb_size");
const amountComb = document.getElementById("amount_comb");
const combId = document.getElementById("comb_id");
const combIdLabel = document.getElementById("comb_id_label");
const permSizeLabel = document.getElementById("perm_size_label");
const amountPerm = document.getElementById("amount_perm");
const permId = document.getElementById("perm_id");
const permIdLabel = document.getElementById("perm_id_label");
const maxPermIdLabel = document.getElementById("max_perm_id_label");
const permutationArea = document.getElementById("permutation_area");
let combination;
doDeal();
calCombination();
