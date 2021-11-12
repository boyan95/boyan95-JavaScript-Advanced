function createPerson(firstName, lastName) {
  const result = {
    firstName,
    lastName,
    fullName: "",
  };

  Object.defineProperty(result, "fullName", {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      [first, last] = value.split(" ");
      if (first && last) {
        this.firstName = first;
        this.lastName = last;
      }
    },
    configurable: true,
    enumerable: true,
  });

  return result;
}
let person = createPerson("Peter", "Ivanov");
console.log(person.fullName); //Peter Ivanov
person.firstName = "George";
console.log(person.fullName); //George Ivanov
person.lastName = "Peterson";
console.log(person.fullName); //George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName); //Nikola
console.log(person.lastName); //Tesla
console.log("-------------------------------");
let person2 = createPerson("Albert", "Simpson");
console.log(person2.fullName); //Albert Simpson
person2.firstName = "Simon";
console.log(person2.fullName); //Simon Simpson
person2.fullName = "Peter";
console.log(person2.firstName); // Simon
console.log(person2.lastName); // Simpson
