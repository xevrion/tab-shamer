// tab shamer
// queries how many tabs you have open across all windows and judges you for it.
// built this on a saturday because i had 47 tabs open and needed to feel something.

const countEl = document.getElementById('tabCount');
const msgEl = document.getElementById('shameMsg');
const bodyEl = document.body;

// message bank, organized by tier. each tier has a few options so it's
// not saying the exact same thing every time you open a tab like a parrot
const TIERS = [
  {
    max: 5,
    className: 'tier-chill',
    messages: [
      "look at you, a person of restraint. respectable.",
      "this is a healthy number of tabs. who are you.",
      "nice and tidy. your computer thanks you.",
      "you have your life together. or at least your browser.",
      "minimalist. iconic. honestly kind of inspiring.",
      "a calm browser is a calm mind. or so i hear.",
      "this tab count says 'i have a system' and i believe you.",
      "ah, a person who closes things. legendary behavior.",
    ],
  },
  {
    max: 10,
    className: 'tier-concerned',
    messages: [
      "okay, starting to add up a little. still fine though.",
      "we're keeping an eye on this. no judgement yet. yet.",
      "a respectable little collection. carry on.",
      "this is the 'i have a few things going on' zone.",
      "double digits incoming. we'll pretend we didn't notice.",
      "still within the realm of 'normal human being'. for now.",
      "you opened a few extra things. that's allowed. that's life.",
      "nothing to see here. just a person with some open tabs. totally average.",
    ],
  },
  {
    max: 15,
    className: 'tier-passive',
    messages: [
      "oh, we're doing this then. okay. cool. cool cool cool.",
      "you've opened a lot of 'i'll read this later' tabs, huh.",
      "no it's fine. i'm fine. everything's fine.",
      "interesting choice to keep all of these open. interesting.",
      "sure, keep going. it's your computer. i'm just a webpage. i don't have feelings. probably.",
      "wow. okay. didn't expect that from you but sure, why not.",
      "you could close some of these. you could. that's all i'll say.",
      "i see we're at the 'pretending to multitask' stage.",
    ],
  },
  {
    max: 20,
    className: 'tier-disappointed',
    messages: [
      "i thought we had an understanding. i guess not.",
      "your RAM has filed a complaint with HR.",
      "i'm not mad. i'm just disappointed. mostly mad though.",
      "this is the digital equivalent of a junk drawer.",
      "we need to talk. not now. but soon. you know what about.",
      "twenty tabs is a number you reach, not a number you maintain.",
      "your browser history is starting to look like a crime board.",
      "each new tab is a tiny betrayal and you keep doing it anyway.",
    ],
  },
  {
    max: 30,
    className: 'tier-dread',
    messages: [
      "do you remember what tab 3 even is anymore? be honest.",
      "somewhere in this mess is a recipe you were going to make. in 2024.",
      "your laptop fan just sighed audibly.",
      "this many tabs is basically a cry for help written in HTML.",
      "i looked into the void. the void had 23 tabs open too.",
      "at least one of these tabs is just a blank google search you never finished typing.",
      "this is the point where 'organized chaos' stops being a compliment.",
      "you are one stiff breeze away from losing all of this and a small part of you wants that.",
      "i did the math. it's not good. i'm not going to show you the math.",
    ],
  },
  {
    max: 50,
    className: 'tier-unhinged',
    messages: [
      "okay so this is just how we live now? got it. cool. love that for us.",
      "at this point each tab is less 'webpage' and more 'unresolved emotion'.",
      "your computer is making a sound it has never made before.",
      "i'm going to be honest, i don't think you're coming back for most of these.",
      "this is no longer browsing. this is hoarding with extra steps.",
      "somewhere, a software engineer is crying and they don't know why. it's because of this.",
      "every new tab is just a little flag planted on the mountain of things you'll never do.",
      "your scrollable tab bar has become a single pixel. congratulations on the achievement.",
      "i'm not saying close them. i'm saying... actually yeah i'm saying close them.",
    ],
  },
  {
    max: Infinity,
    className: 'tier-cursed',
    messages: [
      "i'm not going to say anything. i'm just going to sit here. with you. in this.",
      "there is no number anymore. there is only the count, and the count is suffering.",
      "i've stopped trying to help. we're past help. we're just vibing in the wreckage now.",
      "your fan sounds like a jet preparing for takeoff. it is. you're the cargo.",
      "honestly? respect. this is a bit. this is performance art. this is also a cry for help.",
      "close some tabs. or don't. i'm a webpage, i can't stop you. but please.",
      "this is what the inside of a browser having an existential crisis looks like.",
      "somewhere in here is a tab you opened to look up one fact. you have learned nothing.",
      "we have transcended browsing. this is a lifestyle now. a haunted one.",
      "i would ask if you're okay but we both know the answer and it's in the title bar.",
    ],
  },
];

// pick a random message from the tier so refreshing the new tab page
// doesn't show the exact same line every single time
function pickMessage(tier) {
  const pool = tier.messages;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getTier(count) {
  return TIERS.find(t => count <= t.max);
}

function render(count) {
  const tier = getTier(count);

  countEl.textContent = count;
  msgEl.textContent = pickMessage(tier);

  // wipe old tier classes before applying the new one
  TIERS.forEach(t => bodyEl.classList.remove(t.className));
  bodyEl.classList.add(tier.className);
}

// chrome.tabs.query with empty object grabs tabs across ALL windows,
// not just the current one. this is intentional - if you've spread
// your chaos across 4 windows that still counts, no loopholes
chrome.tabs.query({}, (tabs) => {
  render(tabs.length);
});
