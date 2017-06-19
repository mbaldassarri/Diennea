package com.diennea.server.mapper;

import com.diennea.server.dto.PersonDTO;
import com.diennea.server.model.Person;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PersonMapper {

    PersonDTO toDTO(Person person);

    Person toEntity(PersonDTO person);

    void mapToEntity(PersonDTO personDTO, @MappingTarget Person person);

}
