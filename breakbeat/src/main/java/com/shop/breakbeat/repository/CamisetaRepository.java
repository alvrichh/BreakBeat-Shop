package com.shop.breakbeat.repository;

import org.springframework.stereotype.Repository;

import com.shop.breakbeat.model.Camiseta;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CamisetaRepository  extends JpaRepository<Camiseta, Long>{



}
