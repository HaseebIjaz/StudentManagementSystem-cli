#! /usr/bin/env node
"use strict";
// This project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc.
class Student {
    constructor(name, _balance = 0) {
        this.name = name;
        this.courses = [];
        this.balance = _balance;
        this.isActive = false;
        this.id = Student.idCounter;
        Student.idCounter += 1;
    }
    showStatus() {
        console.table({
            name: this.name,
            id: this.id,
            balance: this.balance,
            isActive: this.isActive,
            courses: this.courses.join(',')
        });
    }
    deductAmount(_amount) {
        this.balance -= _amount;
        if (this.balance < 10) {
            this.isActive = false;
        }
        console.log(`Balance deducted ${_amount}`);
    }
    topup(_amount) {
        this.balance += _amount;
    }
    enrollInACourse(_courseTitle, _amount) {
        this.courses.push(_courseTitle);
        this.isActive = true;
        this.deductAmount(_amount);
    }
}
Student.idCounter = 10000; //Initial Id 
class Course {
    constructor(title, _courseCost) {
        this.title = title;
        this.courseCost = _courseCost ? _courseCost : Course.standardFee;
        this.id = Course.idCounter;
    }
    enrollAStudent(_student) {
        _student.enrollInACourse(this.title, this.courseCost);
    }
}
Course.standardFee = 200;
Course.idCounter = 101;
class StudentManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
    }
    addNewStudent(_name, _balance = 0) {
        const newStudent = new Student(_name, _balance);
        this.students.push(newStudent);
        console.log(`New Student added, ${newStudent.name}`);
        return newStudent;
    }
    addNewCourse(_name, _balance = Course.standardFee) {
        const newCourse = new Course(_name, _balance);
        this.courses.push(newCourse);
        console.log(`New Course added, ${newCourse.title}`);
        return newCourse;
    }
    enroll(_student, _course) {
        _course.enrollAStudent(_student);
        console.log(`Course ${_course.title} Enrolled by student ${_student.name}!`);
    }
    viewBalance(_student) {
    }
    payTutionFee(_student, _course) {
        _course.enrollAStudent(_student);
    }
}
const sms = new StudentManagementSystem();
const st = sms.addNewStudent("Haseeb");
const cr = sms.addNewCourse("Blockchain");
sms.enroll(st, cr);
