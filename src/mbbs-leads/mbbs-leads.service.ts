// vsource-backend-nest\src\mbbs-leads\mbbs-leads.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMbbsLeadDto } from './dto/create-mbbs-lead.dto';
import { UpdateMbbsLeadDto } from './dto/update-mbbs-lead.dto';

@Injectable()
export class MbbsLeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMbbsLeadDto) {
    const lastLead = await this.prisma.mbbsLead.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        leadNumber: true,
      },
    });

    let nextNumber = 1;

    if (lastLead?.leadNumber) {
      const currentNumber = parseInt(
        lastLead.leadNumber.replace('MBBS', ''),
        10,
      );

      nextNumber = currentNumber + 1;
    }

    const leadNumber = `MBBS${String(nextNumber).padStart(4, '0')}`;

    return this.prisma.mbbsLead.create({
      data: {
        leadNumber,

        counsellingDate: dto.counsellingDate
          ? new Date(dto.counsellingDate)
          : null,

        studentName: dto.studentName,
        fatherName: dto.fatherName,

        mobileNumber: dto.mobileNumber,
        emailId: dto.emailId,

        address: dto.address,

        state: dto.state,
        city: dto.city,

        passport: dto.passport,

        passportExpireDate: dto.passportExpireDate
          ? new Date(dto.passportExpireDate)
          : null,

        source: dto.source,

        branch: {
          connect: {
            id: dto.branchId,
          },
        },

        twelfthCollegeName: dto.twelfthCollegeName,
        twelfthMarks: dto.twelfthMarks,

        neetMarks: dto.neetMarks,

        ept: dto.ept,

        listeningScore: dto.listeningScore,
        readingScore: dto.readingScore,
        writingScore: dto.writingScore,
        speakingScore: dto.speakingScore,

        preferredCountry: dto.preferredCountry,
        preferredIntake: dto.preferredIntake,
        preferredUniversity: dto.preferredUniversity,
        preferredCourse: dto.preferredCourse,

        remarks: dto.remarks,
      },

      include: {
        branch: true,
      },
    });
  }

  async findAll() {
    return this.prisma.mbbsLead.findMany({
      include: {
        branch: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.mbbsLead.findUnique({
      where: {
        id,
      },
      include: {
        branch: true,
      },
    });
  }

  async update(id: string, dto: UpdateMbbsLeadDto) {
    return this.prisma.mbbsLead.update({
      where: {
        id,
      },
      data: {
        studentName: dto.studentName,
        fatherName: dto.fatherName,
        mobileNumber: dto.mobileNumber,
        emailId: dto.emailId,

        address: dto.address,
        state: dto.state,
        city: dto.city,

        passport: dto.passport,

        twelfthCollegeName: dto.twelfthCollegeName,
        twelfthMarks: dto.twelfthMarks,

        neetMarks: dto.neetMarks,

        ept: dto.ept,

        listeningScore: dto.listeningScore,
        readingScore: dto.readingScore,
        writingScore: dto.writingScore,
        speakingScore: dto.speakingScore,

        preferredCountry: dto.preferredCountry,
        preferredIntake: dto.preferredIntake,
        preferredUniversity: dto.preferredUniversity,
        preferredCourse: dto.preferredCourse,

        remarks: dto.remarks,
      },

      include: {
        branch: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.mbbsLead.delete({
      where: {
        id,
      },
    });
  }
}
