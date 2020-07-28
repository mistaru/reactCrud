package kg.demirbank.crudapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@ApiModel(value = "class Employee")
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty(value = "name of Employee", example = "Harry")
    @NotBlank(message = "The field must not be empty")
    @Size(min = 2, max = 25, message = "The length of the name must be longer than 3 characters")
    private String name;

    @ApiModelProperty(value = "surname of Employee", example = "Potter")
    @NotBlank(message = "The field must not be empty")
    @Size(min = 2, max = 50, message = "The length of the surname must be longer than 3 characters")
    private String surname;

    @ApiModelProperty(value = "birthday of Employee", example = "15-04-1996")
    @DateTimeFormat(pattern = "dd-MM-yyyy", iso = DateTimeFormat.ISO.DATE)
    @NotNull(message = "The date must not be empty")
    @Past(message = "Choose the past time")
    private LocalDate birthday;

    @ApiModelProperty(value = "email of Employee", example = "email@qmail.com")
    @Email
    @Pattern(regexp = "^(.+)@(.+)$")
    private String email;

    @ApiModelProperty(value = "Phone number of Employee", example = "+996708123456")
    @Pattern(regexp = "^\\+([0-9\\-]?){9,11}[0-9]$")
    private String phoneNumber;

}
