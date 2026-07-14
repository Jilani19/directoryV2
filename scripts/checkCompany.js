import { prisma } from '../lib/prisma';
async function run(){
  const company = await prisma.company.findUnique({ where: { slug: 'abbvie' }, select: { slug:true, name:true, isPublic:true, status:true } });
  console.log('Company:', company);
}
run().catch(e=>console.error(e));
