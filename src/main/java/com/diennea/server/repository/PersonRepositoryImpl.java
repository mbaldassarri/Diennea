package com.diennea.server.repository;


import com.diennea.server.dto.PersonDTO;
import com.diennea.server.model.QPerson;
import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.Projections;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class PersonRepositoryImpl implements PersonRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<PersonDTO> findPerson(String input) {

        JPQLQuery query = new JPAQuery(em);
        List<PersonDTO> result = query.from(QPerson.person)
                .where(QPerson.person.username.like(input)
                        .or(QPerson.person.email.like(input))
                        .or(QPerson.person.age.like(input)))
                .list(Projections.fields(PersonDTO.class, QPerson.person.id, QPerson.person.username,
                        QPerson.person.email, QPerson.person.password, QPerson.person.age));
        return result;
    }

}
