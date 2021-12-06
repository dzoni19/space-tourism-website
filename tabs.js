const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);
tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keyLeft = 37;
  const keyRight = 39;

  if (e.keyCode === keyRight || e.keyCode === keyLeft) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    if (e.keyCode === keyRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === keyLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute('aria-controls');
  const targetImage = targetTab.getAttribute('data-image');

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;
  const mainBox = mainContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false);

  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainBox, 'picture');
  showContent(mainBox, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => {
    item.setAttribute('hidden', true);
  });
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden');
}
