const employees = [
  { id: 1, name: "Alice", departmentId: 1, salary: 5000 },
  { id: 2, name: "Bob", departmentId: 2, salary: 7000 },
  { id: 3, name: "Charlie", departmentId: 3, salary: 4500 },
  { id: 4, name: "Diana", departmentId: 1, salary: 5500 },
  { id: 5, name: "Edward", departmentId: 2, salary: 8000 },
  { id: 6, name: "Fiona", departmentId: 4, salary: 6000 },
  { id: 7, name: "George", departmentId: 3, salary: 5200 },
  { id: 8, name: "Helen", departmentId: 4, salary: 7200 },
  { id: 9, name: "Ian", departmentId: 2, salary: 4800 },
  { id: 10, name: "Jane", departmentId: 1, salary: 5100 },
];

const departments = [
  { id: 1, name: "HR" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Sales" },
];

// **T-021**: Can you filter employees who work in the "Engineering" department?
const engineeringDept = departments.find((d) => d.name === "Engineering");
const engineeringEmployees = employees.filter(
  (e) => e.departmentId === engineeringDept.id
);

console.log(engineeringEmployees);

// **T-022**: Create a new array that combines employee names and department names in the format: "Alice (HR)".

// **T-023**: Find the highest salary among employees.

// **T-024**: Check if there is at least one employee in the "Sales" department.

// **T-025**: Write a function to filter employees earning more than 6000.

// **T-026**: Create an array of employee names only.

// **T-027**: Calculate the total salary of all employees using

// **T-028**: Is there any employee earning less than 5000?

// **T-029**: Find the first employee who earns exactly 5100.

// **T-030**: Find the last employee in the "HR" department.

// **T-031**: Find the first employee in the "Marketing" department.

// **T-032**: Check if all employees earn more than 4000.

// **T-033**: Find the first employee in the "Sales" and "HR" department.

// **T-034**: Verify if all employees belong to a department listed in the departments array.

// **T-035**: Log each employee's name and department name to the console.

// **T-036**: Extract all employee names into a single array.

// **T-037**: Increment each employee's salary by 10%

// **T-038**: Assume each employee can have multiple skills. Create an array of employee skills and flatten them.
//                  Example: [{name: "Alice", skills: ["Excel", "Management"]}, ...].

// **T-039**: Find the total salary of all employees working in the "Engineering" department.

// **T-040**: Check if there is any department where all employees earn more than 5000.

// **T-041**: Assume each employee has a projects array (e.g., { id: 1, name: "Alice", projects: ["Project A", "Project B"] }).
//                  Find the total number of unique projects being handled across all employees.

// **T-042**: For each employee, find their department name and return an array of employee names with their department names.

// **T-043**: Get a list of names of employees earning more than 6000.

// **T-044**: Write a for-of loop to print the names of all employees from the employees array.

// **T-045**: Using a for-of loop, print the names of employees earning more than 5000.

// **T-046**: Modify the for-of loop to destructure each employee object and log their name and salary.

// **T-047**: Write a for-of loop to match employees with their departments and print the results.

// **T-048**: Use Array.prototype.entries() with a for-of loop to print the index and name of each employee.
