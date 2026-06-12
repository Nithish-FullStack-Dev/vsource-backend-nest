// src/leads/leads.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const lastLead = await this.prisma.lead.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        leadNumber: true,
      },
    });

    let nextNumber = 1;

    if (lastLead?.leadNumber) {
      const currentNumber = parseInt(lastLead.leadNumber.replace('LD', ''), 10);

      nextNumber = currentNumber + 1;
    }

    const leadNumber = `LD${String(nextNumber).padStart(4, '0')}`;

    return this.prisma.lead.create({
      data: {
        leadNumber,

        studentName: dto.studentName,
        fatherName: dto.fatherName,
        mobileNumber: dto.mobileNumber,
        emailId: dto.emailId,

        place: dto.place,
        passport: dto.passport,

        passportExpireDate: dto.passportExpireDate
          ? new Date(dto.passportExpireDate)
          : null,

        source: dto.source,

        branch: {
          connect: {
            id: dto.branchId!,
          },
        },

        assignedCounselor: dto.assignedCounselorId
          ? {
              connect: {
                id: dto.assignedCounselorId,
              },
            }
          : undefined,

        counsellingDate: dto.counsellingDate
          ? new Date(dto.counsellingDate)
          : null,

        tenthPercentage: dto.tenthPercentage,
        tenthYearOfPassing: dto.tenthYearOfPassing,

        twelfthPercentage: dto.twelfthPercentage,
        twelfthYearOfPassing: dto.twelfthYearOfPassing,

        bachelorsCourse: dto.bachelorsCourse,
        bachelorsUniversityName: dto.bachelorsUniversityName,

        bachelorsPercentage: dto.bachelorsPercentage,
        bachelorsYearOfPassing: dto.bachelorsYearOfPassing,

        backlogs: dto.backlogs,

        workExperience: dto.workExperience,

        preferredCountry: dto.preferredCountry,
        preferredIntake: dto.preferredIntake,
        preferredCourse: dto.preferredCourse,

        greGmatScore: dto.greGmatScore,
        quantitativeScore: dto.quantitativeScore,
        verbalScore: dto.verbalScore,
        analyticalWritingScore: dto.analyticalWritingScore,

        englishTestType: dto.englishTestType,

        listeningScore: dto.listeningScore,
        readingScore: dto.readingScore,
        writingScore: dto.writingScore,
        speakingScore: dto.speakingScore,

        gapsIfAny: dto.gapsIfAny,

        status: dto.status,

        remarks: dto.remarks,

        nextFollowup: dto.nextFollowup ? new Date(dto.nextFollowup) : null,
      },
    });
  }
  async findAll() {
    return this.prisma.lead.findMany({
      include: {
        branch: true,
        assignedCounselor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        branch: true,
        assignedCounselor: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.lead.delete({
      where: {
        id,
      },
    });
  }
  async update(id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: {
        id,
      },
      data: {
        counsellingDate: dto.counsellingDate
          ? new Date(dto.counsellingDate)
          : undefined,

        studentName: dto.studentName,
        fatherName: dto.fatherName,
        mobileNumber: dto.mobileNumber,
        emailId: dto.emailId,

        place: dto.place,
        passport: dto.passport,

        passportExpireDate:
          dto.passportExpireDate !== undefined
            ? dto.passportExpireDate
              ? new Date(dto.passportExpireDate)
              : null
            : undefined,

        source: dto.source,

        branchId: dto.branchId,

        assignedCounselorId: dto.assignedCounselorId,

        tenthPercentage: dto.tenthPercentage,
        tenthYearOfPassing: dto.tenthYearOfPassing,

        twelfthPercentage: dto.twelfthPercentage,
        twelfthYearOfPassing: dto.twelfthYearOfPassing,

        bachelorsCourse: dto.bachelorsCourse,
        bachelorsUniversityName: dto.bachelorsUniversityName,

        bachelorsPercentage: dto.bachelorsPercentage,
        bachelorsYearOfPassing: dto.bachelorsYearOfPassing,

        backlogs: dto.backlogs,

        workExperience: dto.workExperience,

        preferredCountry: dto.preferredCountry,
        preferredIntake: dto.preferredIntake,
        preferredCourse: dto.preferredCourse,

        greGmatScore: dto.greGmatScore,
        quantitativeScore: dto.quantitativeScore,
        verbalScore: dto.verbalScore,
        analyticalWritingScore: dto.analyticalWritingScore,

        englishTestType: dto.englishTestType,

        listeningScore: dto.listeningScore,
        readingScore: dto.readingScore,
        writingScore: dto.writingScore,
        speakingScore: dto.speakingScore,

        gapsIfAny: dto.gapsIfAny,

        status: dto.status,

        remarks: dto.remarks,

        nextFollowup:
          dto.nextFollowup !== undefined
            ? dto.nextFollowup
              ? new Date(dto.nextFollowup)
              : null
            : undefined,
      },

      include: {
        branch: true,
        assignedCounselor: true,
      },
    });
  }
}
