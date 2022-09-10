export default class UserInfo {
  constructor(userName, userProfession, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
    this._userAvatar = document.querySelector(userAvatar);
  }
  
  getUserInfo () {
    return {name: this._userName.textContent, profession: this._userProfession.textContent};
  }
  
  setUserInfo ({name, about}) {
    this._userName.textContent = name;
    this._userProfession.textContent = about;
  }

  setUserAvatar ({avatar}) {
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
  
  setUserId ({_id}) {
    this.userID = _id;
  }

  getUserId () {
    return this.userID;
  }
}