package com.diennea.server.repository;

import com.diennea.server.dto.PersonDTO;

import java.util.List;

public interface PersonRepositoryCustom {

    List<PersonDTO> findPerson(String input);

}
