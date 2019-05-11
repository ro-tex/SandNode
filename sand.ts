interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string; // default is public

    // constructor params can auto-register fields
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }

    static greet(): void { // this is so static that you can't call it on an object!
      console.log(`Hello World`);
    }
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

Student.greet();

let user = new Student("Jane", "M.", "User");
console.log(user.fullName);
