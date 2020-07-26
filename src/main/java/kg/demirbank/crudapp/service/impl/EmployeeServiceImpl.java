package kg.demirbank.crudapp.service.impl;

import kg.demirbank.crudapp.entity.Employee;
import kg.demirbank.crudapp.repository.EmployeeRepository;
import kg.demirbank.crudapp.service.EmployeeService;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(@NotNull EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }

    @Override
    public Employee update(Employee employee, Long id) {
        Employee employee1 = employeeRepository.getOne(id);
        employee1.setBirthday(employee.getBirthday());
        employee1.setEmail(employee.getEmail());
        employee1.setName(employee.getName());
        employee1.setPhoneNumber(employee.getPhoneNumber());
        employee1.setSurname(employee.getSurname());

        return employeeRepository.save(employee1);
    }

    @Override
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee get(Long id) {
        return employeeRepository.getOne(id);
    }
}
