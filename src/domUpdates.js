import $ from 'jquery';

const dom = {

  hideContent: (content) => {
    $(content).hide()
  },

  welcomeMessage: (username) => {
    $('.welcome-msg').html(`<h2>Welcome ${username}!</h2>`)
  },

  renderAmountSpent: (traveler, tripData, destinationData) => {
    let amountSpent = traveler.findAmountSpent(tripData, destinationData);
    $('.amount-spent').html(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
  }

};


export default dom;

//
