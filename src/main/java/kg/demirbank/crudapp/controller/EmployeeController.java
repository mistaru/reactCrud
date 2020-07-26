package kg.demirbank.crudapp.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kg.demirbank.crudapp.entity.Employee;
import kg.demirbank.crudapp.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/employee")
@ApiResponses(value = {
        @ApiResponse(code=400, message = "This is a bad request, please follow the API documentation for the proper request format."),
        @ApiResponse(code=500, message = "The server is down. Please make sure that the Location microservice is running.")})
@Api(value="Employee resources", description ="crud operation")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(@NotNull EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/saved")
    @ApiOperation(value = "Add new employee", response = Employee.class)
    public ResponseEntity<Employee> saveUser(@Valid @RequestBody Employee employee) {
        employeeService.save(employee);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/findAll")
    @ApiOperation(value = "Show all employees")
    public ResponseEntity<List<Employee>> listEmployee() {
        return new ResponseEntity<>(employeeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    @ApiOperation(value = "Show employee by Id", response = Employee.class)
    public ResponseEntity<Employee> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(employeeService.get(id),
                HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    @ApiOperation(value = "Update employee by Id", response = Employee.class)
    public ResponseEntity<Employee> update(@Valid @RequestBody Employee employee, @PathVariable Long id) {
        return new ResponseEntity<>(employeeService.update(employee, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ApiOperation(value = "Delete employee by Id", response = Employee.class)
    public ResponseEntity<Employee> delete(@PathVariable Long id) {
        employeeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
