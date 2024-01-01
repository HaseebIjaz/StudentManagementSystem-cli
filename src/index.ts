#! /usr/bin/env node

// This project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc.
class Student{

    protected static idCounter: number = 10000; //Initial Id 
    private courses: string[];
    private balance: number;
    private isActive: boolean;
    private id: number;

    constructor(public name:string , _balance:number = 0 ){
        	this.courses = [];
            this.balance = _balance;
            this.isActive = false;
            this.id = Student.idCounter;
            Student.idCounter += 1;
    }
    public showStatus(){
        console.table({
            name: this.name,
            id: this.id,
            balance: this.balance,
            isActive: this.isActive,
            courses : this.courses.join(',')
        })
    }

    public deductAmount(_amount:number){
        this.balance -= _amount;
        if(this.balance < 10) {
            this.isActive = false;
        }
        console.log(`Balance deducted ${_amount}`);
    }

    public topup(_amount:number){
        this.balance += _amount;
    }

    public enrollInACourse(_courseTitle:string,_amount:number){
        this.courses.push(_courseTitle);
        this.isActive = true;
        this.deductAmount(_amount)
    }

}
class Course {
    private id: number;
    static standardFee: number = 200 as const;
    protected static idCounter: number = 101;
    private courseCost: number;
    constructor(public title:string, _courseCost?:number){
            this.courseCost = _courseCost ? _courseCost : Course.standardFee;
            this.id = Course.idCounter;
    }
    enrollAStudent(_student: Student){
        _student.enrollInACourse(this.title,this.courseCost);
    }
}
class StudentManagementSystem{
    private students: Student[];
    private courses: Course[];
    constructor(){
        this.students = [];
        this.courses = [];
    }
    public addNewStudent(_name:string ,_balance:number = 0):Student{
        const newStudent = new Student(_name,_balance)
        this.students.push(newStudent);
        console.log(`New Student added, ${newStudent.name}`)
        return newStudent;
    }

    public addNewCourse(_name:string, _balance:number = Course.standardFee):Course{
        const newCourse = new Course(_name,_balance);
        this.courses.push(newCourse);
        console.log(`New Course added, ${newCourse.title}`);
        return newCourse;
    }

    public enroll(_student: Student, _course:Course){
        _course.enrollAStudent(_student);
        console.log(`Course ${_course.title} Enrolled by student ${_student.name}!`);
    }

    public viewBalance(_student:Student){

    }
    public payTutionFee(_student:Student, _course:Course) {
        _course.enrollAStudent(_student);
    }
}

const sms = new StudentManagementSystem();
const st = sms.addNewStudent("Haseeb");
const cr = sms.addNewCourse("Blockchain");
sms.enroll(st,cr);


