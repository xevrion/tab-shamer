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
      "i have nothing to say. that's a compliment, by the way.",
      "this is the tab equivalent of a made bed.",
      "you, sir or madam, are thriving.",
      "genuinely peaceful energy coming from this browser.",
      "i could get used to this. please don't ruin it.",
      "this is what 'work-life balance' looks like, apparently.",
      "not a single cry for help in sight. weird. good. weird.",
      "you closed tabs you were done with. revolutionary concept.",
      "i almost feel unemployed looking at this. in a good way.",
      "future generations will study this tab count and weep with envy.",
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
      "a few tabs for 'later'. later is a strong word but okay.",
      "this is fine. this is the 'fine' tier. enjoy it while it lasts.",
      "you're hovering right at the edge of 'organized' and 'a little much'.",
      "i'm not worried. i'm just... aware. i'm aware now.",
      "this many tabs says 'i have hobbies and also problems, but mostly hobbies'.",
      "still recoverable. still very recoverable. noting that down.",
      "a tidy little stack of good intentions. that's what this is.",
      "everything here still has a purpose. probably. mostly.",
      "we're in the calm before something, i just don't know what yet.",
      "you're one search away from this getting interesting.",
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
      "totally normal amount of tabs. for a raccoon building a nest.",
      "every one of these felt important at the time. that's the scary part.",
      "you've entered the 'i'll deal with it later' pact with yourself. again.",
      "this is fine. i'm just going to say that a few more times and see if it helps.",
      "i notice things. i'm noticing this.",
      "there's a tab in here from three days ago and you both know it.",
      "we're approaching 'why do you have two reddit tabs open' territory.",
      "this isn't a red flag yet. it's more of a... beige flag. with intent.",
      "you're collecting tabs like they're going to appreciate in value.",
      "this is the part of the movie where the music gets a little ominous.",
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
      "this many tabs means at least three different versions of you started something today.",
      "i've seen the titles. i know what you were 'just checking'.",
      "your tab bar now requires its own scroll bar. take a moment with that.",
      "somewhere in here, two tabs are arguing about the same topic and neither knows it.",
      "this is what 'i'll get to it' looks like at scale.",
      "you didn't plan this. nobody plans this. and yet, here we are.",
      "i'm going to go ahead and assume tab 14 is just a stack overflow page.",
      "the gap between 'tabs open' and 'tabs being used' has never been wider.",
      "this is the tab count of someone who said 'real quick' about six different things.",
      "your computer fan just changed pitch. it has feelings too, apparently.",
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
      "somewhere around tab 25, this stopped being a browser and became a museum exhibit.",
      "i hope you like the sound your fan makes now, because it's permanent.",
      "you have officially out-tabbed the average human attention span by several lifetimes.",
      "this many open tabs is basically a digital hoarder's intervention waiting to happen.",
      "i looked away for one second and you opened two more. i saw it. i know.",
      "there's a version of you in an alternate timeline who closed these. they're doing great.",
      "your 'recently closed tabs' menu is about to become a horror anthology.",
      "this tab count is the reason your laptop sounds like it's preparing for liftoff.",
      "i'm not panicking. i want to be clear that i, a webpage, am not panicking.",
      "every single one of these tabs thinks it's the important one. they're all wrong.",
      "we've reached the stage where closing tabs feels like it would be rude to them.",
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
      "at this point you're not browsing the internet, you're curating a permanent exhibit of it.",
      "your tabs have formed their own ecosystem. there is probably wildlife in there now.",
      "i ran some numbers and honestly, i think you should sit down.",
      "this is what happens when 'i'll just open this in a new tab' becomes a personality trait.",
      "somewhere in here is a tab so old it remembers a previous version of this website.",
      "your browser isn't slow. it's just tired. it's so tired.",
      "i've started naming some of these tabs. tab 38 is 'Gerald'. he's not doing well.",
      "this many tabs has its own gravitational pull at this point.",
      "you could restart your computer right now and honestly, that might be the kindest thing.",
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
      "there is a council of tabs now. they meet in secret. they do not like you.",
      "your computer is no longer running an operating system. it's running on spite.",
      "i don't have a joke for this one. this one's just kind of sad. respectfully.",
      "at this number, every tab you close gets replaced by two more out of grief.",
      "this is not a browser anymore. this is a digital landfill with a search bar.",
      "the tabs have unionized. they're demanding better working conditions. they will not get them.",
      "somewhere in this pile is the tab that started it all. nobody will ever find it again.",
      "i've run out of jokes. we are now just two entities sharing a quiet moment of dread.",
      "if tabs were sheep, you'd be unable to find the edges of this flock.",
      "this is the final boss of procrastination and you didn't even fight it, you just opened more tabs.",
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
