const fun = () => {
  const x = [];
  const categories = [
    "sc",
    "st",
    "ews",
    "pwd",
    "obc",
    "pwd_general",
    "pwd_obc",
    "pwd_sc",
    "pwd_ews",
    "pwd_st",
  ];
  let data = {
    regNo: 0,
    generalRank: 0,
    category: "",
    categoryRank: "",
    preferences: [],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  };

  const currentCategoryRank = {
    sc: 0,
    st: 0,
    ews: 0,
    pwd: 0,
    obc: 0,
    pwd_general: 0,
    pwd_obc: 0,
    pwd_sc: 0,
    pwd_ews: 0,
    pwd_st: 0,
  };

  for (let i = 0; i < 1000; i++) {
    let regNo = i + 23;
    let generalRank = i;

    const preferences = new Set();
    for (let j = 0; j < 10; j++)
      preferences.add(Math.floor(Math.random() * 9 + 1));

    if (i % 6 == 0) {
      let category = categories[Math.floor(Math.random() * categories.length)];
      let categoryRank = ++currentCategoryRank[category];
      x.push({
        ...data,
        regNo,
        generalRank,
        category,
        categoryRank,
        preferences: [...preferences],
      });
    } else {
      x.push({ ...data, regNo, generalRank, preferences: [...preferences] });
    }
  }
  return x;
};
module.exports = fun();
