bouton
  .fromDOMEvent(document.getElementById("submit-btn"), "click")
  .throttle(500)
  .map(signal => {
    return {
      firstName: document.getElementById("first_name").value,
      lastName: document.getElementById("last_name").value
    }
  })
  .map((signal) => {
    var firstName = signal.firstName;
    var lastName = signal.lastName;

    let error = null;

    if (!firstName || firstName === "") {
      throw new Error("No first name!");
    }

    if (!lastName || lastName === "") {
      throw new Error("No last name!");
    }

    return signal;
  })
  .map((signal) => {
    var firstName = signal.firstName;
    var lastName = signal.lastName;
    signal.greeting = `Hello, ${firstName} ${lastName}`;
    return signal;
  })
  .map((signal) => {
    alert(signal.greeting);
    return signal;
  })
  .errors((error) => {
    console.error(error);
    alert(error.message);
  });
