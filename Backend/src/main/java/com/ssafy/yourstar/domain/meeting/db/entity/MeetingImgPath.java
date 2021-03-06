package com.ssafy.yourstar.domain.meeting.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "meeting_img_path")
@ApiModel(value = "팬미팅 정보 사진")
public class MeetingImgPath {
    @ApiModelProperty(value = "파일 구분 번호")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private int fileId;

    @ApiModelProperty(value = "팬미팅 구분 번호", required = true)
    @OneToOne
    @JoinColumn(name = "meeting_id")
    @JsonBackReference
    private Meeting meetingId;

    @ApiModelProperty(value = "파일명", required = true)
    @Column(name = "file_name")
    private String fileName;

    @ApiModelProperty(value = "파일 크기", required = true)
    @Column(name = "file_size")
    private Long fileSize;

    @ApiModelProperty(value = "파일 확장자명", required = true)
    @Column(name = "file_content_type")
    private String fileContentType;

    @ApiModelProperty(value = "파일이 저장된 주소", required = true)
    @Column(name = "file_url")
    private String fileUrl;

    @ApiModelProperty(value = "파일 등록 시간")
    @CreationTimestamp
    @Column(name = "file_reg_dt")
    private LocalDateTime fileRegDt = LocalDateTime.now();
}
