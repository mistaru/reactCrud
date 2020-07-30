package kg.demirbank.crudapp.service;

import kg.demirbank.crudapp.entity.Employee;

import java.util.List;

public interface EmployeeService {

    void save(Employee employee);

    Employee update(Employee employee);

    void deleteById(Long id);

    List<Employee> findAll();

    Employee get(Long id);
}
