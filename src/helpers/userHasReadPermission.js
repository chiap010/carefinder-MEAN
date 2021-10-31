module.exports = function (strStatus) {
      if (strStatus === "ADMIN" || strStatus === "READ") {
            return true;
      }
      return false;
};
