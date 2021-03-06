package com.ssafy.yourstar.domain.qna.db.repository;

import com.ssafy.yourstar.domain.qna.db.entity.QnaQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaQuestionRepository extends JpaRepository<QnaQuestion, Integer> {
    Page<QnaQuestion> findAll(Pageable pageable);
    Page<QnaQuestion> findAllByMemberId(int memberId, Pageable pageable);
}