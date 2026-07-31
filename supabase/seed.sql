begin;

insert into public.organizations (id, name, slug) values ('2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'URE Guarulhos Sul', 'ure-guarulhos-sul')
on conflict (slug) do update set name = excluded.name, active = true;

insert into public.sectors (id, organization_id, code, slug, name, description) values ('3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ASURE', 'asure', 'Assessoria Técnica', 'Apoio direto à gestão, planejamento, articulação e modernização institucional.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('001d0859-6052-49fa-adeb-67a696e114ce', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ESE', 'ese', 'Equipe de Supervisão de Ensino', 'Supervisão, regularidade, orientação e acompanhamento das unidades escolares.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('4694dc3b-a3f5-4215-9d4c-557c35537485', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'EEC', 'eec', 'Equipe de Especialistas em Currículo', 'Currículo, formação continuada e apoio pedagógico às escolas.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('9007c564-7a07-43e8-a45c-999ffa1a15b6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEINTEC', 'seintec', 'Serviço de Informações Educacionais e Tecnologia', 'Informações educacionais, avaliações, tecnologia e governança digital.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SETEC', 'setec', 'Seção de Tecnologia', 'Operação tecnológica, suporte, conectividade e saúde digital das escolas.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('df41c357-d913-4069-907c-412344014f03', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEGRE', 'segre', 'Serviço de Gestão da Rede Escolar', 'Planejamento, atendimento e organização da rede escolar.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('41acff39-a646-45bf-ba32-d4f09652980e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEMAT', 'semat', 'Seção de Matrícula', 'Matrículas, formação de classes, demanda e capacidade de atendimento.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEVESC', 'sevesc', 'Seção de Vida Escolar', 'Registros, documentos, concluintes e regularização da vida escolar.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('b136b59e-8cdf-462f-998d-e02d28689b0f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEPES', 'sepes', 'Serviço de Pessoas', 'Gestão de pessoas com indicadores agregados e proteção de dados pessoais.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('ca44ab7b-d49a-4500-9a5b-840557bbe642', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEAPE', 'seape', 'Seção de Administração de Pessoal', 'Rotinas, movimentações e processos funcionais.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('e19c195e-3ffa-42be-a91b-a35cd915607d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEFREP', 'sefrep', 'Seção de Frequência e Pagamento', 'Frequência, folha e ocorrências, sob permissões específicas.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEAFIN', 'seafin', 'Serviço de Administração e Finanças', 'Apoio administrativo, gestão documental, compras e finanças.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('715f1a14-a59d-4841-aebc-d1b183047faa', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEFIN', 'sefin', 'Seção de Finanças', 'Execução financeira, repasses, prestação de contas e controle.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('1c6d589d-c849-425e-8b6c-4f8b8f4e166c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECOMSE', 'secomse', 'Seção de Compras e Serviços', 'Compras, contratos, serviços, estoque e distribuição.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('2c0f43a8-06d6-4987-8690-068cffd8a73a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEOM', 'seom', 'Serviço de Obras e Manutenção Escolar', 'Obras, manutenção, infraestrutura e patrimônio escolar.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;
insert into public.sectors (id, organization_id, code, slug, name, description) values ('94044e0e-37e6-405f-94c9-2bbe08ea70d8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SEFISC', 'sefisc', 'Seção de Fiscalização', 'Fiscalização de contratos, serviços, obras, utilidades e patrimônio.')
on conflict (organization_id, code) do update set name = excluded.name, description = excluded.description, active = true;

insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('bbaac6a7-34b5-441d-bda6-7df4c9d025cd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-001', 'agostinho-cano', 'AGOSTINHO CANO', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('e59eeb85-20cb-446d-96dd-613f0427ccc7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-002', 'alayde-maria-vicente-profa', 'ALAYDE MARIA VICENTE PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('e81892b9-cd99-46b3-a48f-08b6b5834139', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-003', 'alberto-bacan-prof', 'ALBERTO BACAN PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('f04d21ed-b986-4b08-8469-89ec45a35796', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-004', 'alberto-mendes-jr-cap-pm', 'ALBERTO MENDES JR CAP PM', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('20cd400b-2193-4209-bfb9-8b71baeb6b9e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-005', 'alexandre-lopes-oliveira', 'ALEXANDRE LOPES OLIVEIRA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('d83d4735-2015-4fe6-a3cc-735d1cbb1f2d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-006', 'alice-chuery-profa', 'ALICE CHUERY PROFA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('f033011e-cb06-464d-b5bf-06b61f2c575d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-007', 'anna-lamberga-zeglio', 'ANNA LAMBERGA ZEGLIO', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('1a8c333f-40d1-4266-9a99-778b41b4405d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-008', 'antonio-de-re-vereador', 'ANTONIO DE RE VEREADOR', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('7f811653-30d6-49b7-845b-5d4693c1a6a2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-009', 'antonio-pratici-prefeito', 'ANTONIO PRATICI PREFEITO', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('910436e8-9714-4ab3-813c-32a46cc47fb8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-010', 'antonio-viana-de-souza-prof', 'ANTONIO VIANA DE SOUZA PROF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('a40fde32-1a7d-40fe-803f-b6f16fdca764', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-011', 'ary-gomes-cel', 'ARY GOMES CEL', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('2a1fc042-d291-4dee-9a15-3925641ace2a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-012', 'august-johannes-ferdinandus-stauder-padre', 'AUGUST JOHANNES FERDINANDUS STAUDER, PADRE', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('7f24ce9d-6fde-4b37-8ed5-79656aac649d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-013', 'bartholomeu-de-carlos', 'BARTHOLOMEU DE CARLOS', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('d80bd3e8-a62b-416e-b38e-8adbaf95e440', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-014', 'bruno-ricco-padre', 'BRUNO RICCO PADRE', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('7fb57235-8a41-46a9-aeeb-2f39c3316f53', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-015', 'cacilda-cacapava-de-oliveira-profa', 'CACILDA CACAPAVA DE OLIVEIRA PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('eeadbebd-46f1-47d7-9015-4572ab3a3cd5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-016', 'capistrano-de-abreu', 'CAPISTRANO DE ABREU', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('95b1346c-2ebc-44c9-8017-50e5acd62cae', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-017', 'carlos-machado-bitencourt-mal', 'CARLOS MACHADO BITENCOURT MAL', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('a461e686-e8a1-4acc-83c1-22b1b07f5e7e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-018', 'cid-augusto-guelli-prof', 'CID AUGUSTO GUELLI PROF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('357f23e5-80dc-4ead-acb7-e114360ab61c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-019', 'cidade-soimco-ii', 'CIDADE SOIMCO II', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('667a5002-f82b-46b0-9a9b-eb8ff03a3e8f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-020', 'clarice-lispector', 'CLARICE LISPECTOR', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('b1e9de57-f494-49c5-9507-70aeb5cd24e1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-021', 'conjunto-hab-bairro-dos-pimentas-ii', 'CONJUNTO HAB. BAIRRO DOS PIMENTAS II', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('e61820ed-f5d3-41e7-aa8d-15e7dc186878', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-022', 'conselheiro-crispiniano', 'CONSELHEIRO CRISPINIANO', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('cff3cc51-54dd-4d3b-b1b9-f4a4dc34b263', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-023', 'emilia-anna-antonio-profa', 'EMILIA ANNA ANTONIO PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('c8643197-8167-4fe8-aa3d-b8618a786848', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-024', 'ennio-chiesa-prof', 'ENNIO CHIESA PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('50531abd-5ae1-431b-b1b8-0ec8450abc98', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-025', 'erico-verissimo', 'ERICO VERISSIMO', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('dbd7e8c3-80ec-44f7-a9d9-f3763098e670', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-026', 'fabio-fanucchi-prof', 'FABIO FANUCCHI PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('ce10113d-f763-420c-aa7b-be94304367c0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-027', 'francisca-batista-trindade-profa', 'FRANCISCA BATISTA TRINDADE PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('5fc0b68a-143f-4e2e-a749-bd0ec9e627c1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-028', 'frederico-de-barros-brotero-prof', 'FREDERICO DE BARROS BROTERO PROF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('f2ce9742-bc6e-4043-a6e3-ca72c1a78822', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-029', 'guilhermino-rodrigues-de-lima', 'GUILHERMINO RODRIGUES DE LIMA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('b0f9ffa0-7b66-4952-b38b-96f8fe10859b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-030', 'homero-rubens-de-sa-prof', 'HOMERO RUBENS DE SA PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('610fa073-fc4b-4472-81ea-41401cbee81e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-031', 'hugo-de-aguiar', 'HUGO DE AGUIAR', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('29fa5422-536a-47c6-b6da-433a4b388f42', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-032', 'inocoop-ii', 'INOCOOP II', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('52931925-de09-4d0a-8231-473310a2366b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-033', 'izabel-ferreira-dos-santos-profa', 'IZABEL FERREIRA DOS SANTOS PROFA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('1e05e6ac-f1c8-4ea7-afee-e590be255b08', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-034', 'jair-miranda-dr', 'JAIR MIRANDA DR', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('003ed753-2487-4ec2-a4ff-0a20a4afb2bc', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-035', 'jardim-aruja', 'JARDIM ARUJÁ', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('328e9cc0-a2a9-4e23-a505-c8c80a5ea16f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-036', 'jd-maria-dirce-iii', 'JD MARIA DIRCE III', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('48a03513-1a22-4b81-84e0-5d0f1159779d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-037', 'jd-nova-cumbica-ii', 'JD NOVA CUMBICA II', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('d0ce1934-abc9-4228-8df2-cc2b079aec94', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-038', 'joao-alvares-de-siqueira-bueno', 'JOAO ALVARES DE SIQUEIRA BUENO', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('46f7bf8a-237f-4f97-9bc5-a787869db642', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-039', 'joao-cavalheiro-salem-prof', 'JOAO CAVALHEIRO SALEM PROF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('ffd29e9d-b297-4459-bfa6-d167b85fc26f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-040', 'joao-crispiniano-soares', 'JOAO CRISPINIANO SOARES', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('ff04e821-1e17-4d82-aeb2-be428057e0b2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-041', 'joao-de-almeida-barbosa', 'JOAO DE ALMEIDA BARBOSA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('d667acf8-5529-4b66-b046-88fe7a37a2c6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-042', 'joao-nunes-pastor', 'JOAO NUNES PASTOR', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('b3edab0c-0b1c-4e61-8e82-09469fe91603', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-043', 'joao-ribeiro-de-barros-comandante', 'JOAO RIBEIRO DE BARROS COMANDANTE', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('c7bd8991-48b1-420f-89b4-a109dfad108d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-044', 'jocila-pereira-guimaraes-profa', 'JOCILA PEREIRA GUIMARAES PROFA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('72611c9a-98b5-4773-9f5f-073753df75e7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-045', 'jose-alves-de-cerqueira-cesar', 'JOSE ALVES DE CERQUEIRA CESAR', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('e1296b5a-4ec3-41e9-9bd6-03d85f041ee0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-046', 'jose-da-costa-boucinhas-prof', 'JOSE DA COSTA BOUCINHAS PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('4db761e0-d984-4e58-b3fe-3ca6b25346a6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-047', 'jose-roberto-friebolin-prof', 'JOSE ROBERTO FRIEBOLIN PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('52e2e908-bc9c-4900-a966-d46e5778b0dc', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-048', 'jose-scaramelli-prof', 'JOSE SCARAMELLI PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('d938e07c-f819-4bc9-a08e-4ee537fd343a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-049', 'lar-irma-celeste', 'LAR IRMA CELESTE', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('c9292e7e-e6be-4577-a8cb-8d6432546491', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-050', 'laura-da-purificacao-c-mendes-profa', 'LAURA DA PURIFICACAO C.MENDES PROFA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('45bef175-c125-45ae-887b-d646c9423e3b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-051', 'levi-vieira-da-maia-prof', 'LEVI VIEIRA DA MAIA, PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('44ac69b7-af58-40e5-acdb-e74a75571472', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-052', 'licinio-carpinelli-prof', 'LICINIO CARPINELLI PROF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('f098972d-122d-4649-b091-5832307fde27', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-053', 'lindamil-barbosa-de-oliveira-profa', 'LINDAMIL BARBOSA DE OLIVEIRA PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('a2b55283-a25d-4984-a685-d7b20b9e7e7c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-054', 'louis-braille', 'LOUIS BRAILLE', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('f223a676-a7aa-4d9d-9e99-fbdb03cf7dac', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-055', 'maria-aparecida-felix-porto-profa', 'MARIA APARECIDA FELIX PORTO PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('be966a2d-09ab-4b55-8a7c-5386ad71036d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-056', 'maria-aparecida-rodrigues-profa', 'MARIA APARECIDA RODRIGUES PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('bc5f917e-670f-4b67-9001-3e51540b54c9', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-057', 'maria-hilda-ornelas-de-oliveira-profa', 'MARIA HILDA ORNELAS DE OLIVEIRA PROFA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('5c5e16d7-cc16-4df8-8a10-6ff47ad78d87', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-058', 'maria-leda-fernandes-brigo-profa', 'MARIA LEDA FERNANDES BRIGO PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('6861b156-f3d8-435c-ab9f-b27c3908b8bf', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-059', 'marinha-ferr-do-nascimento-profa', 'MARINHA FERR. DO NASCIMENTO PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('c4055a92-9f9d-4590-bee0-985e8d745ce1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-060', 'mario-nakata-prof', 'MARIO NAKATA PROF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('2fe85700-07b7-467f-95f4-10a50b301fdd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-061', 'mauricio-goulart-deputado', 'MAURICIO GOULART DEPUTADO', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('b6ca1b76-35a3-4821-8236-7bb1c228f3f4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-062', 'orlando-minella', 'ORLANDO MINELLA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('5bbeb347-7ce4-46a2-a84a-c32ea8afb07b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-063', 'oswaldo-sampaio-alves', 'OSWALDO SAMPAIO ALVES', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('bcf025f1-c398-48bd-944b-05669fb8d910', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-064', 'parque-jurema-iii', 'PARQUE JUREMA III', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('67f0e0ba-a9ec-4e3d-95d0-abb0948564d0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-065', 'parque-jurema-iv', 'PARQUE JUREMA IV', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('df607623-4682-4ea3-90b8-715976ab869c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-066', 'pascoal-maimoni-filho-prof', 'PASCOAL MAIMONI FILHO PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('42117c20-b302-4f79-bb73-2be63172139b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-067', 'paulo-nogueira-prof', 'PAULO NOGUEIRA PROF', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('8196c14e-f9c3-4ff9-87d6-7707dadcb747', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-068', 'paulo-rolim-loureiro-dom', 'PAULO ROLIM LOUREIRO DOM', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('2ea3f33e-3eab-4a55-8e05-9122b5ba9741', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-069', 'pedro-morceli', 'PEDRO MORCELI', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('6aec07df-80e1-4be0-9260-4e0808d74029', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-070', 'pimentas-vii', 'PIMENTAS VII', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('7e3a52b6-93a0-4139-b708-585bbc468206', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-071', 'rafael-rodrigues-filho-pref', 'RAFAEL RODRIGUES FILHO,PREF', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('7d1f8689-71ab-4b57-8c86-fa97a226eeb1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-072', 'republica-da-venezuela', 'REPUBLICA DA VENEZUELA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('fdf2d59e-748a-4941-b6fa-0a29cdba6ce5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-073', 'republica-da-venezuela-ii', 'REPÚBLICA DA VENEZUELA II', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('e0f8c1a1-f19f-484a-b0f8-1732fb47ba29', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-074', 'roberto-hipolito-da-costa-brig-ar', 'ROBERTO HIPOLITO DA COSTA BRIG.AR', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('dc10778b-9840-4dcb-94d5-a32531c1eccb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-075', 'rotary', 'ROTARY', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('7387af8d-5833-4ba8-a9e0-461efa06ceda', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-076', 'sebastiao-walter-fusco', 'SEBASTIAO WALTER FUSCO', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('544ad61a-f95a-4e2e-a9f8-f814c3d1c480', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-077', 'therezinha-closa-eleuterio-profa', 'THEREZINHA CLOSA ELEUTERIO PROFA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('302f2026-6fa0-463e-8fe4-da2bab4b7a6a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-078', 'valentin-gonzalez-alonso-padre', 'VALENTIN GONZALEZ ALONSO PADRE', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('b54e31b4-3b85-4cd9-a690-b2ec43ab6c47', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-079', 'vicente-melro', 'VICENTE MELRO', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('522c3348-94aa-4bbd-bdff-bc6389a01758', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-080', 'victor-civita', 'VICTOR CIVITA', true)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('81ec6b48-e851-4669-9e0b-14da0af4eb23', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-081', 'waldemar-freire-veras-vereador', 'WALDEMAR FREIRE VERAS VEREADOR', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;
insert into public.schools (id, organization_id, internal_code, slug, name, pei) values ('aabc1b29-f8aa-41d8-9d00-6eb668797a81', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'school-082', 'zilda-romeiro-pinto-moreira-da-silva-profa', 'ZILDA ROMEIRO PINTO MOREIRA DA SILVA, PROFA', false)
on conflict (organization_id, internal_code) do update set name = excluded.name, slug = excluded.slug, pei = excluded.pei, active = true;

insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, default_role, scope, description) values ('e6479b87-b409-4898-8d5f-c4ba5e5a12e8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'REGIONAL', 'Dirigente / Coordenador Regional', 'Visão Regional', 'ADMIN', 'regional:guarulhos-sul', 'Visão estratégica e integrada da Unidade Regional de Ensino Guarulhos Sul.')
on conflict (organization_id, scope) do update set name = excluded.name, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('bde9b839-5274-417c-a8f1-3083cfff6c98', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Assessoria Técnica – ASURE', 'ASURE', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'GESTAO', 'sector:ASURE', 'Perfil institucional de Assessoria Técnica.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('53a767ad-2b49-4102-8460-d384a14fae1a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Equipe de Supervisão de Ensino – ESE', 'ESE', '001d0859-6052-49fa-adeb-67a696e114ce', 'GESTAO', 'sector:ESE', 'Perfil institucional de Equipe de Supervisão de Ensino.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('e55ba65c-854e-44c3-bec7-4180e502dcc3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Equipe de Especialistas em Currículo – EEC', 'EEC', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'GESTAO', 'sector:EEC', 'Perfil institucional de Equipe de Especialistas em Currículo.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('43a35fc2-3ba5-4db1-96e7-d9d1fc500ad4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Serviço de Informações Educacionais e Tecnologia – SEINTEC', 'SEINTEC', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'GESTAO', 'sector:SEINTEC', 'Perfil institucional de Serviço de Informações Educacionais e Tecnologia.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('1f53bda1-0b43-45c5-90d8-bec05c7f353f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Tecnologia – SETEC', 'SETEC', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'GESTAO', 'sector:SETEC', 'Perfil institucional de Seção de Tecnologia.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('31c64abc-bd81-446a-97b6-5522193f48cb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Serviço de Gestão da Rede Escolar – SEGRE', 'SEGRE', 'df41c357-d913-4069-907c-412344014f03', 'GESTAO', 'sector:SEGRE', 'Perfil institucional de Serviço de Gestão da Rede Escolar.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('9f8b2dc5-47f9-49c1-88d4-5abed874df1f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Matrícula – SEMAT', 'SEMAT', '41acff39-a646-45bf-ba32-d4f09652980e', 'GESTAO', 'sector:SEMAT', 'Perfil institucional de Seção de Matrícula.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('c6decf23-1e5c-41a1-a1c6-392c2cd8cdd6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Vida Escolar – SEVESC', 'SEVESC', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'GESTAO', 'sector:SEVESC', 'Perfil institucional de Seção de Vida Escolar.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('e273cf8e-f4b0-476b-9eda-729186288ffc', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Serviço de Pessoas – SEPES', 'SEPES', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'GESTAO', 'sector:SEPES', 'Perfil institucional de Serviço de Pessoas.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('46e2188a-7948-4e78-bb8a-09daa36a4003', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Administração de Pessoal – SEAPE', 'SEAPE', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'GESTAO', 'sector:SEAPE', 'Perfil institucional de Seção de Administração de Pessoal.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('4b603523-d8cc-4654-b2ec-5c18fd703c23', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Frequência e Pagamento – SEFREP', 'SEFREP', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'GESTAO', 'sector:SEFREP', 'Perfil institucional de Seção de Frequência e Pagamento.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('91b473a2-7876-46f5-84f7-1076aab4559e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Serviço de Administração e Finanças – SEAFIN', 'SEAFIN', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'GESTAO', 'sector:SEAFIN', 'Perfil institucional de Serviço de Administração e Finanças.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('b1b5f370-701a-4e5d-9d0c-1b1de7a53ed5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Finanças – SEFIN', 'SEFIN', '715f1a14-a59d-4841-aebc-d1b183047faa', 'GESTAO', 'sector:SEFIN', 'Perfil institucional de Seção de Finanças.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('6f36365d-dd0d-47b8-a27f-a14891f1f75e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Compras e Serviços – SECOMSE', 'SECOMSE', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'GESTAO', 'sector:SECOMSE', 'Perfil institucional de Seção de Compras e Serviços.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('bffe07de-da12-48d9-a057-30a36c9c94cd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Serviço de Obras e Manutenção Escolar – SEOM', 'SEOM', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'GESTAO', 'sector:SEOM', 'Perfil institucional de Serviço de Obras e Manutenção Escolar.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, sector_id, default_role, scope, description) values ('c6490040-ac71-4dc6-90df-d1893afd7d65', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SECTOR', 'Seção de Fiscalização – SEFISC', 'SEFISC', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'GESTAO', 'sector:SEFISC', 'Perfil institucional de Seção de Fiscalização.')
on conflict (organization_id, scope) do update set name = excluded.name, sector_id = excluded.sector_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('31d3a669-1987-4937-ae00-68ee0d42b8d5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'AGOSTINHO CANO', 'AGOSTINHO CANO', 'bbaac6a7-34b5-441d-bda6-7df4c9d025cd', 'ESCOLA', 'school:school-001', 'Perfil institucional da unidade escolar AGOSTINHO CANO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('d138ad53-d1a9-4253-be1d-faeb16a5ca2c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ALAYDE MARIA VICENTE PROFA', 'ALAYDE MARIA VICENTE PROFA', 'e59eeb85-20cb-446d-96dd-613f0427ccc7', 'ESCOLA', 'school:school-002', 'Perfil institucional da unidade escolar ALAYDE MARIA VICENTE PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a5210707-e78a-4a09-8268-3bd37c95dfb4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ALBERTO BACAN PROF', 'ALBERTO BACAN PROF', 'e81892b9-cd99-46b3-a48f-08b6b5834139', 'ESCOLA', 'school:school-003', 'Perfil institucional da unidade escolar ALBERTO BACAN PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('664c750f-40ee-41ad-b3bb-b7f9e32f4e66', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ALBERTO MENDES JR CAP PM', 'ALBERTO MENDES JR CAP PM', 'f04d21ed-b986-4b08-8469-89ec45a35796', 'ESCOLA', 'school:school-004', 'Perfil institucional da unidade escolar ALBERTO MENDES JR CAP PM.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('7ebe7052-b026-4621-8340-5b0b855d647a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ALEXANDRE LOPES OLIVEIRA', 'ALEXANDRE LOPES OLIVEIRA', '20cd400b-2193-4209-bfb9-8b71baeb6b9e', 'ESCOLA', 'school:school-005', 'Perfil institucional da unidade escolar ALEXANDRE LOPES OLIVEIRA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('8afdf38a-e1d1-4d7c-a19e-940634790401', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ALICE CHUERY PROFA', 'ALICE CHUERY PROFA', 'd83d4735-2015-4fe6-a3cc-735d1cbb1f2d', 'ESCOLA', 'school:school-006', 'Perfil institucional da unidade escolar ALICE CHUERY PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('223d7885-955b-49eb-90a5-410427992093', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ANNA LAMBERGA ZEGLIO', 'ANNA LAMBERGA ZEGLIO', 'f033011e-cb06-464d-b5bf-06b61f2c575d', 'ESCOLA', 'school:school-007', 'Perfil institucional da unidade escolar ANNA LAMBERGA ZEGLIO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('aeb7c395-a348-4409-a97f-91518a3d3bbb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ANTONIO DE RE VEREADOR', 'ANTONIO DE RE VEREADOR', '1a8c333f-40d1-4266-9a99-778b41b4405d', 'ESCOLA', 'school:school-008', 'Perfil institucional da unidade escolar ANTONIO DE RE VEREADOR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('9ae94ed9-3e38-4d7f-acc7-5f24605616e5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ANTONIO PRATICI PREFEITO', 'ANTONIO PRATICI PREFEITO', '7f811653-30d6-49b7-845b-5d4693c1a6a2', 'ESCOLA', 'school:school-009', 'Perfil institucional da unidade escolar ANTONIO PRATICI PREFEITO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('adda49d7-dd88-4518-bcd7-7728b63baf73', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ANTONIO VIANA DE SOUZA PROF', 'ANTONIO VIANA DE SOUZA PROF', '910436e8-9714-4ab3-813c-32a46cc47fb8', 'ESCOLA', 'school:school-010', 'Perfil institucional da unidade escolar ANTONIO VIANA DE SOUZA PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('0b205c26-4bb9-4320-b42a-fd7950e51313', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ARY GOMES CEL', 'ARY GOMES CEL', 'a40fde32-1a7d-40fe-803f-b6f16fdca764', 'ESCOLA', 'school:school-011', 'Perfil institucional da unidade escolar ARY GOMES CEL.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('4e8d9794-9cf9-47f2-8dc7-fb4f604b56af', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'AUGUST JOHANNES FERDINANDUS STAUDER, PADRE', 'AUGUST JOHANNES FERDINANDUS STAUDER, PADRE', '2a1fc042-d291-4dee-9a15-3925641ace2a', 'ESCOLA', 'school:school-012', 'Perfil institucional da unidade escolar AUGUST JOHANNES FERDINANDUS STAUDER, PADRE.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('c786b319-874f-4b41-b607-8ac74dfadfe1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'BARTHOLOMEU DE CARLOS', 'BARTHOLOMEU DE CARLOS', '7f24ce9d-6fde-4b37-8ed5-79656aac649d', 'ESCOLA', 'school:school-013', 'Perfil institucional da unidade escolar BARTHOLOMEU DE CARLOS.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('85f566e7-abde-4298-96d8-83484c5d0a42', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'BRUNO RICCO PADRE', 'BRUNO RICCO PADRE', 'd80bd3e8-a62b-416e-b38e-8adbaf95e440', 'ESCOLA', 'school:school-014', 'Perfil institucional da unidade escolar BRUNO RICCO PADRE.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('90c50a5f-5cea-48dd-8999-62fbcfdd5401', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CACILDA CACAPAVA DE OLIVEIRA PROFA', 'CACILDA CACAPAVA DE OLIVEIRA PROFA', '7fb57235-8a41-46a9-aeeb-2f39c3316f53', 'ESCOLA', 'school:school-015', 'Perfil institucional da unidade escolar CACILDA CACAPAVA DE OLIVEIRA PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('006617ba-1e4c-4977-9d4c-2cfcce47821d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CAPISTRANO DE ABREU', 'CAPISTRANO DE ABREU', 'eeadbebd-46f1-47d7-9015-4572ab3a3cd5', 'ESCOLA', 'school:school-016', 'Perfil institucional da unidade escolar CAPISTRANO DE ABREU.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('967f23cc-6c46-4ea6-80ee-d765751bcba1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CARLOS MACHADO BITENCOURT MAL', 'CARLOS MACHADO BITENCOURT MAL', '95b1346c-2ebc-44c9-8017-50e5acd62cae', 'ESCOLA', 'school:school-017', 'Perfil institucional da unidade escolar CARLOS MACHADO BITENCOURT MAL.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('dfed245f-347d-45bc-a548-cbfdb9a91992', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CID AUGUSTO GUELLI PROF', 'CID AUGUSTO GUELLI PROF', 'a461e686-e8a1-4acc-83c1-22b1b07f5e7e', 'ESCOLA', 'school:school-018', 'Perfil institucional da unidade escolar CID AUGUSTO GUELLI PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('24843678-a4c2-4d0f-8679-710897da1406', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CIDADE SOIMCO II', 'CIDADE SOIMCO II', '357f23e5-80dc-4ead-acb7-e114360ab61c', 'ESCOLA', 'school:school-019', 'Perfil institucional da unidade escolar CIDADE SOIMCO II.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('05b44dce-0b79-467c-9dca-9a34629f9992', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CLARICE LISPECTOR', 'CLARICE LISPECTOR', '667a5002-f82b-46b0-9a9b-eb8ff03a3e8f', 'ESCOLA', 'school:school-020', 'Perfil institucional da unidade escolar CLARICE LISPECTOR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('1650cf76-1e95-46c7-bafc-53685863f104', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CONJUNTO HAB. BAIRRO DOS PIMENTAS II', 'CONJUNTO HAB. BAIRRO DOS PIMENTAS II', 'b1e9de57-f494-49c5-9507-70aeb5cd24e1', 'ESCOLA', 'school:school-021', 'Perfil institucional da unidade escolar CONJUNTO HAB. BAIRRO DOS PIMENTAS II.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('12323734-0b5d-4f96-a690-e7bd01ef37a1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'CONSELHEIRO CRISPINIANO', 'CONSELHEIRO CRISPINIANO', 'e61820ed-f5d3-41e7-aa8d-15e7dc186878', 'ESCOLA', 'school:school-022', 'Perfil institucional da unidade escolar CONSELHEIRO CRISPINIANO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a291ec2d-85b6-4112-94a7-afb74824dd92', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'EMILIA ANNA ANTONIO PROFA', 'EMILIA ANNA ANTONIO PROFA', 'cff3cc51-54dd-4d3b-b1b9-f4a4dc34b263', 'ESCOLA', 'school:school-023', 'Perfil institucional da unidade escolar EMILIA ANNA ANTONIO PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('1f3bd957-5102-44b3-8d52-8789acb74eca', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ENNIO CHIESA PROF', 'ENNIO CHIESA PROF', 'c8643197-8167-4fe8-aa3d-b8618a786848', 'ESCOLA', 'school:school-024', 'Perfil institucional da unidade escolar ENNIO CHIESA PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('347fa9de-1d03-4c05-b8f7-8f91844e82f8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ERICO VERISSIMO', 'ERICO VERISSIMO', '50531abd-5ae1-431b-b1b8-0ec8450abc98', 'ESCOLA', 'school:school-025', 'Perfil institucional da unidade escolar ERICO VERISSIMO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('02fc53b2-2c07-4e5c-8bc6-c84a0842bbdd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'FABIO FANUCCHI PROF', 'FABIO FANUCCHI PROF', 'dbd7e8c3-80ec-44f7-a9d9-f3763098e670', 'ESCOLA', 'school:school-026', 'Perfil institucional da unidade escolar FABIO FANUCCHI PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('40e21033-1029-45f7-a534-7eccfb5879e7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'FRANCISCA BATISTA TRINDADE PROFA', 'FRANCISCA BATISTA TRINDADE PROFA', 'ce10113d-f763-420c-aa7b-be94304367c0', 'ESCOLA', 'school:school-027', 'Perfil institucional da unidade escolar FRANCISCA BATISTA TRINDADE PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('525eab29-0116-4f55-a18b-e06ba8ce042c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'FREDERICO DE BARROS BROTERO PROF', 'FREDERICO DE BARROS BROTERO PROF', '5fc0b68a-143f-4e2e-a749-bd0ec9e627c1', 'ESCOLA', 'school:school-028', 'Perfil institucional da unidade escolar FREDERICO DE BARROS BROTERO PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('853220e4-d676-4d6e-beab-5b0c85096a80', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'GUILHERMINO RODRIGUES DE LIMA', 'GUILHERMINO RODRIGUES DE LIMA', 'f2ce9742-bc6e-4043-a6e3-ca72c1a78822', 'ESCOLA', 'school:school-029', 'Perfil institucional da unidade escolar GUILHERMINO RODRIGUES DE LIMA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('b6caef2b-eb60-4ba5-8ef0-d929a7137f47', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'HOMERO RUBENS DE SA PROF', 'HOMERO RUBENS DE SA PROF', 'b0f9ffa0-7b66-4952-b38b-96f8fe10859b', 'ESCOLA', 'school:school-030', 'Perfil institucional da unidade escolar HOMERO RUBENS DE SA PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('c80e5b6c-2d1b-467b-b87c-ceb71de80733', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'HUGO DE AGUIAR', 'HUGO DE AGUIAR', '610fa073-fc4b-4472-81ea-41401cbee81e', 'ESCOLA', 'school:school-031', 'Perfil institucional da unidade escolar HUGO DE AGUIAR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('0c777ec6-81fa-4764-b99f-8f0b0a5db02d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'INOCOOP II', 'INOCOOP II', '29fa5422-536a-47c6-b6da-433a4b388f42', 'ESCOLA', 'school:school-032', 'Perfil institucional da unidade escolar INOCOOP II.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('aeb67cb5-3958-4aee-8211-5e56a88d0960', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'IZABEL FERREIRA DOS SANTOS PROFA', 'IZABEL FERREIRA DOS SANTOS PROFA', '52931925-de09-4d0a-8231-473310a2366b', 'ESCOLA', 'school:school-033', 'Perfil institucional da unidade escolar IZABEL FERREIRA DOS SANTOS PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('326f32c9-e66b-4a32-90c9-fb29db0e55be', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JAIR MIRANDA DR', 'JAIR MIRANDA DR', '1e05e6ac-f1c8-4ea7-afee-e590be255b08', 'ESCOLA', 'school:school-034', 'Perfil institucional da unidade escolar JAIR MIRANDA DR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('b402278f-21b0-4de2-9de5-0c1509f8ba5f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JARDIM ARUJÁ', 'JARDIM ARUJÁ', '003ed753-2487-4ec2-a4ff-0a20a4afb2bc', 'ESCOLA', 'school:school-035', 'Perfil institucional da unidade escolar JARDIM ARUJÁ.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('0b1a3e0e-2926-4baa-9352-85a2aa285002', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JD MARIA DIRCE III', 'JD MARIA DIRCE III', '328e9cc0-a2a9-4e23-a505-c8c80a5ea16f', 'ESCOLA', 'school:school-036', 'Perfil institucional da unidade escolar JD MARIA DIRCE III.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('5a598d1f-89be-47c7-a19f-4e4231e8d1c9', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JD NOVA CUMBICA II', 'JD NOVA CUMBICA II', '48a03513-1a22-4b81-84e0-5d0f1159779d', 'ESCOLA', 'school:school-037', 'Perfil institucional da unidade escolar JD NOVA CUMBICA II.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a0f10bc3-a2e9-48c4-a913-b7dda6b681aa', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOAO ALVARES DE SIQUEIRA BUENO', 'JOAO ALVARES DE SIQUEIRA BUENO', 'd0ce1934-abc9-4228-8df2-cc2b079aec94', 'ESCOLA', 'school:school-038', 'Perfil institucional da unidade escolar JOAO ALVARES DE SIQUEIRA BUENO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('e34e4bfb-2e47-4145-b57a-9f04cb2f565d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOAO CAVALHEIRO SALEM PROF', 'JOAO CAVALHEIRO SALEM PROF', '46f7bf8a-237f-4f97-9bc5-a787869db642', 'ESCOLA', 'school:school-039', 'Perfil institucional da unidade escolar JOAO CAVALHEIRO SALEM PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('dc54c4bd-8029-4471-bfaa-1465f4b26980', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOAO CRISPINIANO SOARES', 'JOAO CRISPINIANO SOARES', 'ffd29e9d-b297-4459-bfa6-d167b85fc26f', 'ESCOLA', 'school:school-040', 'Perfil institucional da unidade escolar JOAO CRISPINIANO SOARES.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('2bfa179e-88af-4342-82cd-da543bd19339', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOAO DE ALMEIDA BARBOSA', 'JOAO DE ALMEIDA BARBOSA', 'ff04e821-1e17-4d82-aeb2-be428057e0b2', 'ESCOLA', 'school:school-041', 'Perfil institucional da unidade escolar JOAO DE ALMEIDA BARBOSA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('0ded7ff0-0751-402c-bb22-69919bab27ce', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOAO NUNES PASTOR', 'JOAO NUNES PASTOR', 'd667acf8-5529-4b66-b046-88fe7a37a2c6', 'ESCOLA', 'school:school-042', 'Perfil institucional da unidade escolar JOAO NUNES PASTOR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('6e63e5ea-96fa-4587-8126-ea2abfc482c4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOAO RIBEIRO DE BARROS COMANDANTE', 'JOAO RIBEIRO DE BARROS COMANDANTE', 'b3edab0c-0b1c-4e61-8e82-09469fe91603', 'ESCOLA', 'school:school-043', 'Perfil institucional da unidade escolar JOAO RIBEIRO DE BARROS COMANDANTE.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a4411c24-f536-45ed-b100-0c2524d7b75f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOCILA PEREIRA GUIMARAES PROFA', 'JOCILA PEREIRA GUIMARAES PROFA', 'c7bd8991-48b1-420f-89b4-a109dfad108d', 'ESCOLA', 'school:school-044', 'Perfil institucional da unidade escolar JOCILA PEREIRA GUIMARAES PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('5531a89c-470a-483e-894e-5ee6c656daed', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOSE ALVES DE CERQUEIRA CESAR', 'JOSE ALVES DE CERQUEIRA CESAR', '72611c9a-98b5-4773-9f5f-073753df75e7', 'ESCOLA', 'school:school-045', 'Perfil institucional da unidade escolar JOSE ALVES DE CERQUEIRA CESAR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('7c7daf93-a876-4ce0-87d9-b722ee3111cf', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOSE DA COSTA BOUCINHAS PROF', 'JOSE DA COSTA BOUCINHAS PROF', 'e1296b5a-4ec3-41e9-9bd6-03d85f041ee0', 'ESCOLA', 'school:school-046', 'Perfil institucional da unidade escolar JOSE DA COSTA BOUCINHAS PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('52aa8632-06d5-4e60-8a8f-3b08727fd360', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOSE ROBERTO FRIEBOLIN PROF', 'JOSE ROBERTO FRIEBOLIN PROF', '4db761e0-d984-4e58-b3fe-3ca6b25346a6', 'ESCOLA', 'school:school-047', 'Perfil institucional da unidade escolar JOSE ROBERTO FRIEBOLIN PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a8b7bacd-cd47-4db4-9f94-250514e455c8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'JOSE SCARAMELLI PROF', 'JOSE SCARAMELLI PROF', '52e2e908-bc9c-4900-a966-d46e5778b0dc', 'ESCOLA', 'school:school-048', 'Perfil institucional da unidade escolar JOSE SCARAMELLI PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('1fa1fcd8-031b-485c-bfd2-d42486f43e6f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'LAR IRMA CELESTE', 'LAR IRMA CELESTE', 'd938e07c-f819-4bc9-a08e-4ee537fd343a', 'ESCOLA', 'school:school-049', 'Perfil institucional da unidade escolar LAR IRMA CELESTE.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('90dda5b0-afd6-4de1-95e4-4246e12072d5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'LAURA DA PURIFICACAO C.MENDES PROFA', 'LAURA DA PURIFICACAO C.MENDES PROFA', 'c9292e7e-e6be-4577-a8cb-8d6432546491', 'ESCOLA', 'school:school-050', 'Perfil institucional da unidade escolar LAURA DA PURIFICACAO C.MENDES PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a90fb5e8-d3e6-43c2-9b16-2edaa1900474', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'LEVI VIEIRA DA MAIA, PROF', 'LEVI VIEIRA DA MAIA, PROF', '45bef175-c125-45ae-887b-d646c9423e3b', 'ESCOLA', 'school:school-051', 'Perfil institucional da unidade escolar LEVI VIEIRA DA MAIA, PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('be216eb5-7093-4c3c-bba2-dcf9495f3ec5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'LICINIO CARPINELLI PROF', 'LICINIO CARPINELLI PROF', '44ac69b7-af58-40e5-acdb-e74a75571472', 'ESCOLA', 'school:school-052', 'Perfil institucional da unidade escolar LICINIO CARPINELLI PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('6deb65dc-df17-438b-948e-d5ab06af3d88', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'LINDAMIL BARBOSA DE OLIVEIRA PROFA', 'LINDAMIL BARBOSA DE OLIVEIRA PROFA', 'f098972d-122d-4649-b091-5832307fde27', 'ESCOLA', 'school:school-053', 'Perfil institucional da unidade escolar LINDAMIL BARBOSA DE OLIVEIRA PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('3110f57e-5392-4a28-a587-e7f769387b21', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'LOUIS BRAILLE', 'LOUIS BRAILLE', 'a2b55283-a25d-4984-a685-d7b20b9e7e7c', 'ESCOLA', 'school:school-054', 'Perfil institucional da unidade escolar LOUIS BRAILLE.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('63642000-fcad-4cc4-9896-ded7ca9124f1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MARIA APARECIDA FELIX PORTO PROFA', 'MARIA APARECIDA FELIX PORTO PROFA', 'f223a676-a7aa-4d9d-9e99-fbdb03cf7dac', 'ESCOLA', 'school:school-055', 'Perfil institucional da unidade escolar MARIA APARECIDA FELIX PORTO PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('d6b670c0-81f7-49ec-988f-7ccf926c8f9d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MARIA APARECIDA RODRIGUES PROFA', 'MARIA APARECIDA RODRIGUES PROFA', 'be966a2d-09ab-4b55-8a7c-5386ad71036d', 'ESCOLA', 'school:school-056', 'Perfil institucional da unidade escolar MARIA APARECIDA RODRIGUES PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('3bb1d417-50fd-4538-9e40-834e04d700a6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MARIA HILDA ORNELAS DE OLIVEIRA PROFA', 'MARIA HILDA ORNELAS DE OLIVEIRA PROFA', 'bc5f917e-670f-4b67-9001-3e51540b54c9', 'ESCOLA', 'school:school-057', 'Perfil institucional da unidade escolar MARIA HILDA ORNELAS DE OLIVEIRA PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('449e9b70-e8ec-4914-ba7d-45350f7f2c0c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MARIA LEDA FERNANDES BRIGO PROFA', 'MARIA LEDA FERNANDES BRIGO PROFA', '5c5e16d7-cc16-4df8-8a10-6ff47ad78d87', 'ESCOLA', 'school:school-058', 'Perfil institucional da unidade escolar MARIA LEDA FERNANDES BRIGO PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('0f573783-0651-432a-837c-18b79e138787', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MARINHA FERR. DO NASCIMENTO PROFA', 'MARINHA FERR. DO NASCIMENTO PROFA', '6861b156-f3d8-435c-ab9f-b27c3908b8bf', 'ESCOLA', 'school:school-059', 'Perfil institucional da unidade escolar MARINHA FERR. DO NASCIMENTO PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('ceb0890b-da5d-4870-89a6-b0ad917f3670', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MARIO NAKATA PROF', 'MARIO NAKATA PROF', 'c4055a92-9f9d-4590-bee0-985e8d745ce1', 'ESCOLA', 'school:school-060', 'Perfil institucional da unidade escolar MARIO NAKATA PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a2da9dfc-3e76-4842-a8cf-52fca68b8b92', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'MAURICIO GOULART DEPUTADO', 'MAURICIO GOULART DEPUTADO', '2fe85700-07b7-467f-95f4-10a50b301fdd', 'ESCOLA', 'school:school-061', 'Perfil institucional da unidade escolar MAURICIO GOULART DEPUTADO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('e052ccef-a741-425f-8c4a-8b64035fda9b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ORLANDO MINELLA', 'ORLANDO MINELLA', 'b6ca1b76-35a3-4821-8236-7bb1c228f3f4', 'ESCOLA', 'school:school-062', 'Perfil institucional da unidade escolar ORLANDO MINELLA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('37e9e2ee-7ac2-4bd2-9e57-f394506c5792', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'OSWALDO SAMPAIO ALVES', 'OSWALDO SAMPAIO ALVES', '5bbeb347-7ce4-46a2-a84a-c32ea8afb07b', 'ESCOLA', 'school:school-063', 'Perfil institucional da unidade escolar OSWALDO SAMPAIO ALVES.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('34d0bcb1-6830-41b2-998f-79755880563a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PARQUE JUREMA III', 'PARQUE JUREMA III', 'bcf025f1-c398-48bd-944b-05669fb8d910', 'ESCOLA', 'school:school-064', 'Perfil institucional da unidade escolar PARQUE JUREMA III.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('ed37c29f-f78b-4f72-b321-4255d678eabd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PARQUE JUREMA IV', 'PARQUE JUREMA IV', '67f0e0ba-a9ec-4e3d-95d0-abb0948564d0', 'ESCOLA', 'school:school-065', 'Perfil institucional da unidade escolar PARQUE JUREMA IV.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a31bc3ca-1aa5-4300-80e9-2379552da89a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PASCOAL MAIMONI FILHO PROF', 'PASCOAL MAIMONI FILHO PROF', 'df607623-4682-4ea3-90b8-715976ab869c', 'ESCOLA', 'school:school-066', 'Perfil institucional da unidade escolar PASCOAL MAIMONI FILHO PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('b901007a-3d76-4f6d-89a2-12864e3f3b9e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PAULO NOGUEIRA PROF', 'PAULO NOGUEIRA PROF', '42117c20-b302-4f79-bb73-2be63172139b', 'ESCOLA', 'school:school-067', 'Perfil institucional da unidade escolar PAULO NOGUEIRA PROF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('677e8cc4-53cd-4207-b21b-42f871ca25f0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PAULO ROLIM LOUREIRO DOM', 'PAULO ROLIM LOUREIRO DOM', '8196c14e-f9c3-4ff9-87d6-7707dadcb747', 'ESCOLA', 'school:school-068', 'Perfil institucional da unidade escolar PAULO ROLIM LOUREIRO DOM.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('b416a8f5-309f-4535-ab24-a018f00a8b0b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PEDRO MORCELI', 'PEDRO MORCELI', '2ea3f33e-3eab-4a55-8e05-9122b5ba9741', 'ESCOLA', 'school:school-069', 'Perfil institucional da unidade escolar PEDRO MORCELI.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('789e35f3-3f0f-42ee-b8e1-ec0497fb0d16', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'PIMENTAS VII', 'PIMENTAS VII', '6aec07df-80e1-4be0-9260-4e0808d74029', 'ESCOLA', 'school:school-070', 'Perfil institucional da unidade escolar PIMENTAS VII.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('3ff90e37-1d14-4fed-bd48-3253ec035766', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'RAFAEL RODRIGUES FILHO,PREF', 'RAFAEL RODRIGUES FILHO,PREF', '7e3a52b6-93a0-4139-b708-585bbc468206', 'ESCOLA', 'school:school-071', 'Perfil institucional da unidade escolar RAFAEL RODRIGUES FILHO,PREF.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('a6b1db8c-e0bf-4756-926f-fd8086360476', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'REPUBLICA DA VENEZUELA', 'REPUBLICA DA VENEZUELA', '7d1f8689-71ab-4b57-8c86-fa97a226eeb1', 'ESCOLA', 'school:school-072', 'Perfil institucional da unidade escolar REPUBLICA DA VENEZUELA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('e4852cea-f35e-4829-b3ed-0aa11fdbaad7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'REPÚBLICA DA VENEZUELA II', 'REPÚBLICA DA VENEZUELA II', 'fdf2d59e-748a-4941-b6fa-0a29cdba6ce5', 'ESCOLA', 'school:school-073', 'Perfil institucional da unidade escolar REPÚBLICA DA VENEZUELA II.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('f6236840-2bae-4d76-9298-667104bf46b2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ROBERTO HIPOLITO DA COSTA BRIG.AR', 'ROBERTO HIPOLITO DA COSTA BRIG.AR', 'e0f8c1a1-f19f-484a-b0f8-1732fb47ba29', 'ESCOLA', 'school:school-074', 'Perfil institucional da unidade escolar ROBERTO HIPOLITO DA COSTA BRIG.AR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('f357417f-93dc-41d8-89da-1020febca541', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ROTARY', 'ROTARY', 'dc10778b-9840-4dcb-94d5-a32531c1eccb', 'ESCOLA', 'school:school-075', 'Perfil institucional da unidade escolar ROTARY.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('82e9251a-714e-430c-89cf-875e4ba5847a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'SEBASTIAO WALTER FUSCO', 'SEBASTIAO WALTER FUSCO', '7387af8d-5833-4ba8-a9e0-461efa06ceda', 'ESCOLA', 'school:school-076', 'Perfil institucional da unidade escolar SEBASTIAO WALTER FUSCO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('d25cd7e6-8c32-4675-9c5e-76ec46bb3887', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'THEREZINHA CLOSA ELEUTERIO PROFA', 'THEREZINHA CLOSA ELEUTERIO PROFA', '544ad61a-f95a-4e2e-a9f8-f814c3d1c480', 'ESCOLA', 'school:school-077', 'Perfil institucional da unidade escolar THEREZINHA CLOSA ELEUTERIO PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('7b9d78a2-efac-4580-a3f8-6d80583846ea', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'VALENTIN GONZALEZ ALONSO PADRE', 'VALENTIN GONZALEZ ALONSO PADRE', '302f2026-6fa0-463e-8fe4-da2bab4b7a6a', 'ESCOLA', 'school:school-078', 'Perfil institucional da unidade escolar VALENTIN GONZALEZ ALONSO PADRE.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('c42a9494-4c01-4966-8963-80c06f4a6b36', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'VICENTE MELRO', 'VICENTE MELRO', 'b54e31b4-3b85-4cd9-a690-b2ec43ab6c47', 'ESCOLA', 'school:school-079', 'Perfil institucional da unidade escolar VICENTE MELRO.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('60c6b024-b2fa-4266-a623-2aa62176da4a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'VICTOR CIVITA', 'VICTOR CIVITA', '522c3348-94aa-4bbd-bdff-bc6389a01758', 'ESCOLA', 'school:school-080', 'Perfil institucional da unidade escolar VICTOR CIVITA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('e54daf4f-6866-4cf9-8417-a72528f5c73a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'WALDEMAR FREIRE VERAS VEREADOR', 'WALDEMAR FREIRE VERAS VEREADOR', '81ec6b48-e851-4669-9e0b-14da0af4eb23', 'ESCOLA', 'school:school-081', 'Perfil institucional da unidade escolar WALDEMAR FREIRE VERAS VEREADOR.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, school_id, default_role, scope, description) values ('07c47a30-e979-4654-b383-ac3057034f8f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'SCHOOL', 'ZILDA ROMEIRO PINTO MOREIRA DA SILVA, PROFA', 'ZILDA ROMEIRO PINTO MOREIRA DA SILVA, PROFA', 'aabc1b29-f8aa-41d8-9d00-6eb668797a81', 'ESCOLA', 'school:school-082', 'Perfil institucional da unidade escolar ZILDA ROMEIRO PINTO MOREIRA DA SILVA, PROFA.')
on conflict (organization_id, scope) do update set name = excluded.name, school_id = excluded.school_id, active = true;
insert into public.institutional_profiles (id, organization_id, profile_type, name, short_name, default_role, scope, description) values ('89cc7a7d-4487-4aae-a566-f80af8274990', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'DEMO', 'Visitante', 'Ambiente demonstrativo', 'VISITANTE', 'demo', 'Versão demonstrativa do RADAR 360.')
on conflict (organization_id, scope) do update set name = excluded.name, active = true;

insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('09b9024d-0ca9-420d-be64-8f6b918b7080', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('02e1c99b-86c7-413c-b783-24d0e7b35908', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Plano de Trabalho da URE', 'plano-de-trabalho-da-ure')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('85fdfc02-6637-442e-8ee8-a0ccb143b95c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Planejamento Estratégico', 'planejamento-estrategico')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('de84df4a-03f7-48e5-ab2c-2f55b89452ac', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Projetos e Programas', 'projetos-e-programas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e10456a5-a320-45f6-9d84-f7b8a15198eb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Demandas da Dirigente', 'demandas-da-dirigente')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9cb6e3e4-8359-4959-a8c1-1fbdcc4ab1cc', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Indicadores Gerenciais', 'indicadores-gerenciais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0bcd799d-b499-4d30-8bef-29d52e51244b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Relatórios Institucionais', 'relatorios-institucionais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('3ff4e15a-e4c1-41e9-8ec1-e61b5b0cd29c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Processos e Expedientes', 'processos-e-expedientes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('91cf076b-6e14-45ac-87dc-f428dcc601c5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Contratos e Convênios – Acompanhamento', 'contratos-e-convenios-acompanhamento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8ef0d684-fb8b-45b9-9e27-e070ce2c13ee', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Transformação Digital', 'transformacao-digital')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('85565a43-1d86-4fce-b77c-53deb48152ee', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Gestão do Conhecimento', 'gestao-do-conhecimento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1ed10548-98c6-4591-ab41-0387e2a13609', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Agenda Institucional', 'agenda-institucional')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1f77bd7b-b434-4856-8ffe-37f3ec67ce2a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Autoridades e Visitas', 'autoridades-e-visitas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('6ede5d87-9cdb-4771-b79e-8b50aae18c17', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Demandas Judiciais', 'demandas-judiciais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ca14107d-af96-46d2-8e93-2f6f33ddae11', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '3ab878fb-a64c-4bfb-b97a-8b0243f6d9b7', 'Documentos', 'documentos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('551d595d-5ad1-4d18-b46f-7fc4eed53ee1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('211fdb34-b38f-427a-b1ce-939c156a963e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Escolas por Supervisor', 'escolas-por-supervisor')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('a6ff4d4e-58d3-4fea-94ec-8c2b4779ba29', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Visitas de Supervisão', 'visitas-de-supervisao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5aeed707-61e5-4645-b614-7e97cf71c900', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Plano de Acompanhamento', 'plano-de-acompanhamento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('06c137a6-14ee-429f-8c36-2992485ebd48', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Apoio Presencial', 'apoio-presencial')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0d0ba6d5-b9fe-460e-99b7-7b40fe2c052c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Processos Educacionais', 'processos-educacionais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9e537776-d444-4311-a89b-b469dbe7257a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Regularidade das Escolas', 'regularidade-das-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9889f465-f993-4624-b3c6-7509d92b7537', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Autorizações e Funcionamento', 'autorizacoes-e-funcionamento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b546117d-374e-49fb-887c-21f740bf1fce', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Documentos Escolares', 'documentos-escolares')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('3dbf76b8-62a6-4c38-9175-d9977a2370e6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e1b523f5-0edd-4cf4-ae0e-59c7a14f8a75', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Programas e Projetos', 'programas-e-projetos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('fb945b23-72bf-45c5-a077-426704d73bf3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Comissões e Apurações', 'comissoes-e-apuracoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e638bb6d-e8e9-4739-865a-1b9e2d54c813', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Evidências', 'evidencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d2da0442-d1fc-473a-a238-7c19d013fd71', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Devolutivas', 'devolutivas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e23d3039-f085-43fe-a67d-970cdfbd0273', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('98afc571-364b-43b1-8396-5e1bc0acac29', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'Histórico por Escola', 'historico-por-escola')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('729a3568-2ed1-471b-a64b-d6de999b6467', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2d66e76c-9d47-4d8c-8527-067d35815b21', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Currículo', 'curriculo')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0c23972f-c7a8-47b1-9a16-9c5ef2c7d0be', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Formação Continuada', 'formacao-continuada')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f90ff165-ab9a-4566-98fb-83fcb63851ef', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Programas e Projetos', 'programas-e-projetos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e01d6d85-82cd-45db-9dc5-3cfc226a0402', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Acompanhamento Pedagógico', 'acompanhamento-pedagogico')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d7395f9a-179b-4a65-a1a3-8704d61481e5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Apoio Presencial às Escolas', 'apoio-presencial-as-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('79a56085-ff30-45f5-9d64-1fdd773b501f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Materiais Didáticos', 'materiais-didaticos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('956f71c8-8970-4008-99c8-8a8b4bbfa5ee', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Avaliações', 'avaliacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5141a059-63e9-43c8-a2c8-41c3fd62efd6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Indicadores Educacionais', 'indicadores-educacionais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2ffd9c0c-dd92-4846-9763-7f6b1da18a11', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Resultados de Aprendizagem', 'resultados-de-aprendizagem')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('31ad9cb0-eb20-4044-bc6b-be238b4a7e93', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Planos de Melhoria', 'planos-de-melhoria')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bc2a802d-735c-4433-9e40-75808ea026bb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Salas de Leitura', 'salas-de-leitura')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e861e201-0cdb-47a2-b5dc-7e3c4205a199', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Educação Especial e Inclusão', 'educacao-especial-e-inclusao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('05d5240a-db14-436d-9c60-1be643c37637', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Reuniões Pedagógicas', 'reunioes-pedagogicas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('116bd8ba-70c0-47cb-84ec-09654a2976a1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Formações Realizadas', 'formacoes-realizadas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('4671d70a-616e-4981-ac00-677d3fc0cfa4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Agenda de Formação', 'agenda-de-formacao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('47cb88d6-5623-4b22-ac4d-35ad4bcd5e72', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '4694dc3b-a3f5-4215-9d4c-557c35537485', 'Evidências Pedagógicas', 'evidencias-pedagogicas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('11efc773-a19f-47ff-bb09-ba0ad7fb5d89', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8ad3fe88-acb0-4300-9752-187aa2d154c4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Avaliações', 'avaliacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('780b76e4-4dcb-413b-a563-35e7cbf62f1d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Provas e Aplicações', 'provas-e-aplicacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2e6fb221-5388-4a3d-a7a0-9b62b0fb29b2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Tecnologia Educacional', 'tecnologia-educacional')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0c3cac37-f3d6-47bb-8aa9-d71a6878b90f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Inclusão Digital', 'inclusao-digital')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('94cb69ef-873d-43b9-893b-a6a5c159b656', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Ambientes Tecnológicos', 'ambientes-tecnologicos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('6639a6f6-b9be-4019-bca4-eb7fa84aa1ec', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Plataformas Educacionais', 'plataformas-educacionais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('76052752-1e04-44fb-8dcb-c7792930b24a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ff85ac14-2038-4a49-a1b6-10e92803b046', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Coletas', 'coletas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('00017a3b-5e25-4b09-b5b3-97b0fb9cc18a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Bases de Dados', 'bases-de-dados')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('a853746d-23f1-4d8e-81c4-8f90a8ee12ae', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Escolas', 'escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('64b79462-d92d-4427-b412-3a496e33aa38', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Projetos', 'projetos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('878663db-96d4-4523-8635-751a9b9625c3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Acompanhamentos', 'acompanhamentos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8e93cef5-81e7-4cdd-af1b-71ac4950565b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Evidências', 'evidencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('abc79327-ff0a-4ef9-831c-0d8bcc187568', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e17ed7f4-5c3d-4017-be0b-f2351e25b06a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Painéis', 'paineis')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('87bb90d9-76c3-4cbb-b68a-33ef46b495af', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9007c564-7a07-43e8-a45c-999ffa1a15b6', 'Governança Digital', 'governanca-digital')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('6ab7a81e-b449-46fc-bde6-79bcdd26a927', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Painel Operacional', 'painel-operacional')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('805eac1f-c666-44c7-b5ed-6fde35d4d1a7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Chamados', 'chamados')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c45ea984-5bd1-4855-aba9-2d4d6b944787', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Apoio ao Usuário', 'apoio-ao-usuario')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0e1cd51d-96b7-40e0-affc-35b7e4407dcc', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Escolas', 'escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('29e99b5d-9542-492b-85d3-dd37cf680284', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Equipamentos', 'equipamentos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5d3836d3-bf07-43af-bb13-85e2879f175f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Inventário', 'inventario')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('537ea387-6987-44e1-9c05-ce9f847ff38e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Conectividade', 'conectividade')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c9fc2a5d-a370-4455-8738-20164fa7dfb1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Wi-Fi', 'wi-fi')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9d9231a1-761d-4de6-8884-75a536e2c6f9', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'LAN', 'lan')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('29e6d904-4700-41e5-8f96-6fa5e1c7cdc2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Access Points', 'access-points')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9feab109-569a-4b50-99f7-5cae28e5cd38', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'SD-WAN', 'sd-wan')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('792d6086-ae91-4618-935f-f5d99404301a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Infraestrutura de Rede', 'infraestrutura-de-rede')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('72b994fb-28b7-47f1-879c-c8d329eda899', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Manutenção', 'manutencao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('96162547-0167-4327-ab1f-08965cb9e356', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Field Service', 'field-service')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('01ac8a58-9d13-46dc-abab-a07607c80ac7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Visitas Técnicas', 'visitas-tecnicas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('cf1b81cf-acb5-403e-880a-a86231dfd9d3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'PROATI', 'proati')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0a6aa4e4-161b-402a-90b4-6bd015b96f0e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Plataformas', 'plataformas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ec6146b3-d2cc-4e83-a2fd-4cb2ba8f54dc', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Evidências', 'evidencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('76357741-43de-4242-a5f1-3f1760546417', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b2492401-dd8a-4ef6-ba8c-42f9d90a14de', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'Saúde Tecnológica das Escolas', 'saude-tecnologica-das-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('38e17dd8-3ea8-47e9-a873-bc50e64f6ba8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('6b609ae8-1f95-4eb2-80e8-1d9d33419d76', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Rede Escolar', 'rede-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1d582cd1-e0d8-498c-ad71-e3d783bb6b6b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Demanda Escolar', 'demanda-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('21838273-b42d-4101-a18f-cf62c0191f69', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Vagas', 'vagas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('16b2c9af-3782-4758-a2da-94135d2eb70a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Matrículas', 'matriculas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('4eba01b5-923d-4f10-9833-28b21252a30a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Vida Escolar', 'vida-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('dc6027c8-4d3c-41a8-88fe-e78a8079de7a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Censo Escolar', 'censo-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('4344118b-8cfe-49fd-88de-ad8d6ab7d824', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Cadastro de Escolas', 'cadastro-de-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('229cf718-4a47-4077-b728-89aea608a7f8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Criação de Escolas', 'criacao-de-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('89b92a45-763a-4ab6-8b58-616816a37de9', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Expansão da Rede', 'expansao-da-rede')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b616dc5e-f581-4b18-beba-e50bf1802189', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Municipalização', 'municipalizacao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('6f720a95-161b-4c38-b330-3580177d729f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Planejamento de Atendimento', 'planejamento-de-atendimento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('eae7f10a-955e-4ad0-bd43-2f8d7e3a6000', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Escolas', 'escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2b5ab10b-8833-420c-80f4-d06bb262ae7f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7aa91a0d-a968-4b53-87bf-f6cff4ee5c54', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'df41c357-d913-4069-907c-412344014f03', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e1b9380d-6745-4dbf-a32c-2c9dfb44e3a8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7dbe1527-c3b7-464e-a596-9f6e35aac7bf', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Matrículas', 'matriculas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('87da955b-696f-40c3-a5a5-9080a1dec35c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Formação de Classes', 'formacao-de-classes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('537045df-7e19-462d-bf9b-aded92086d19', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Demanda por Vagas', 'demanda-por-vagas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ccffa66d-7c46-4a2c-924f-691bfa9d2408', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Transferências', 'transferencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('a5cbeea7-c34b-4acb-b2bf-463d010df937', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Atendimento Escolar', 'atendimento-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f117fc79-5f39-4b3d-bcf4-3c94e9ea9b02', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Capacidade de Atendimento', 'capacidade-de-atendimento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1a36f7b3-5b3f-4c6b-9c7e-0855f43c58e5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Expansão da Rede', 'expansao-da-rede')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8dc561a6-119a-4c9b-8d98-32a104e3062a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Novas Escolas', 'novas-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e8e9fc82-bd53-48e6-a273-25659ddea703', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Municipalização', 'municipalizacao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b8c761dc-e7c5-431c-a0db-7e4132c7cd89', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Escolas', 'escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c37a91b4-2dea-4755-98c7-b8f9a907703e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e6df5920-e299-42b3-b0b4-8497136e0cb6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b125c2ce-6028-474d-a64f-4b27f7554289', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '41acff39-a646-45bf-ba32-d4f09652980e', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7400c08a-2f3c-4e73-a535-16f60f4273e8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2ff96f51-b7ca-4ef3-9015-cd976d6dcbee', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Vida Escolar', 'vida-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8e16629b-bafc-40b4-a903-6572224f6556', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Registros Escolares', 'registros-escolares')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2b673b18-446c-428c-9b48-83fc541863b7', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Históricos Escolares', 'historicos-escolares')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1c8d9fe5-9f3a-4442-b1d2-d79125ed71ea', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Certificados', 'certificados')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1f30d51c-bc7f-4984-b3c9-6f022e76bf6a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Diplomas', 'diplomas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('758206b4-d344-4e92-9ad5-a8c49923a2c2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Concluintes', 'concluintes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d090010f-f1d5-49f1-af01-1cc8815c09ca', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Educação de Jovens e Adultos', 'educacao-de-jovens-e-adultos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1d31a7ed-2671-441c-b49c-ea3036a0b538', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Regularização de Vida Escolar', 'regularizacao-de-vida-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('37de988c-2917-445f-ac96-9313e40207dd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Documentação Escolar', 'documentacao-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('13a99d66-40ba-4812-85bd-b87a9a32c5c4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Arquivo de Escolas', 'arquivo-de-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('4c8d3d53-28d8-408b-bdd5-944a665afe4c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Escolas Extintas', 'escolas-extintas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('31f6ad38-ec26-4fea-b0a3-43be6ee27150', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('3ab98547-765b-4b75-bb6b-96f9fc37a000', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('107e407e-62c5-4b7d-ab0b-eb81cb60132c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '9f4ef2d5-e1c6-4aef-aaba-38ea2e0df774', 'Processos', 'processos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('23565158-47b7-4f80-9720-c64a0d8c369e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('69d5dddb-923d-46a3-8999-5e082f458a22', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Gestão de Pessoas', 'gestao-de-pessoas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e5c5ae31-4072-47a5-b6c7-d3083d660032', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Administração de Pessoal', 'administracao-de-pessoal')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('265e2f55-b0c3-4764-b474-81b64ab84219', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Frequência e Pagamento', 'frequencia-e-pagamento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d60ab0e2-5fad-4029-8a1b-3631a75c402d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Desenvolvimento Profissional', 'desenvolvimento-profissional')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('71b29445-e94d-424e-8077-db1a8a48380e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Atribuição de Classes e Aulas', 'atribuicao-de-classes-e-aulas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('623138cf-fb1c-4920-841c-b83dcf85a0aa', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Absenteísmo', 'absenteismo')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('65dd0567-d3f4-426c-81cf-4d856e58ecfa', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Vagas', 'vagas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2724481d-0405-406c-abb2-43956b078c02', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Readaptação', 'readaptacao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('77e4687e-65d8-4525-925b-242493dfc54a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Indicadores de Pessoal', 'indicadores-de-pessoal')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0ed7eb00-d255-46ac-a324-e0aa409c66c8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d1f030b0-7d21-4e0b-b9bd-dc995a5914ce', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Processos', 'processos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bf072dc3-8879-4f88-be1c-1530d48a7ebe', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'b136b59e-8cdf-462f-998d-e02d28689b0f', 'Escolas', 'escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2e0c33b4-23b0-4974-974b-10d8c6b021f6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bf40d76b-df53-4c8c-8a7c-5a17bea0964a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Administração de Pessoal', 'administracao-de-pessoal')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('51aab37b-6d18-4989-8ddc-dd3f1ce58457', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Atribuição de Classes e Aulas', 'atribuicao-de-classes-e-aulas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bd083c00-e1eb-4cf3-81c9-c5674f232885', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Absenteísmo', 'absenteismo')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('88cd9ddb-801b-4fad-9654-f3f715835b0a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Vagas', 'vagas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('3cfe7938-ef4d-4a92-99fe-60672b6d2759', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Readaptação', 'readaptacao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f9f57e7a-fc69-49df-8a64-e9ff3c81ebdf', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Movimentações', 'movimentacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ab073248-63bb-4d33-adec-bcbe14c90365', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Processos Funcionais', 'processos-funcionais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('eae11925-494b-47e2-b163-5e514290ea78', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Rotinas de Pessoal', 'rotinas-de-pessoal')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('79b82a7c-899f-4ce7-83f0-bd089b5a071b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('95ea70a0-cb37-4dfc-a542-93d98ce72ef9', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('cbd1ff0b-00ba-40d2-9798-f24464995ebe', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'ca44ab7b-d49a-4500-9a5b-840557bbe642', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7a02d859-fafc-473b-8192-a469c1962810', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('75697fcb-3f91-4358-9844-bf45eb694c9b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Frequência', 'frequencia')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1ed50bf4-6ecb-4ae1-9f21-d2da447cebf2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Pagamento', 'pagamento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b8dee523-1712-440d-a69b-a7665b66079e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Folha de Pagamento', 'folha-de-pagamento')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('953c4494-e95f-44e3-900f-6d76b4a8a6e5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Inclusões em Folha', 'inclusoes-em-folha')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1c13c393-964e-4c87-b948-e175f2d9a218', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Ocorrências', 'ocorrencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c6c55ea6-9b7d-4954-8192-6e70537284d2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('865b2c74-ccaa-4aa6-b1cc-8d4bf1fa1058', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Processos', 'processos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('4ee51d95-9b03-464a-b71e-612ce482c48b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Orientações', 'orientacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('968fc2ff-ab54-4136-87d9-c8063bec56a5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'e19c195e-3ffa-42be-a91b-a35cd915607d', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5670f7b8-48d6-4d60-89b6-82de52c36123', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('26d5ac92-ca92-4126-a9ca-a46dc47e6f99', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Apoio Administrativo às Escolas', 'apoio-administrativo-as-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('3b97c341-31e3-4218-9d5f-17b10045d451', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Gestão Financeira', 'gestao-financeira')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('dcce1079-c337-401c-838f-3fbc822372af', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Gestão Documental', 'gestao-documental')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d8e37c61-2974-4b29-be03-ebd113d3ea82', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Processos', 'processos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8cccbd70-11b6-4e5e-9d30-2c7226c8d070', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Protocolo', 'protocolo')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f33141a9-e246-48b6-a9a9-56dff6108b33', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Expedientes', 'expedientes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2f2e04f0-70e0-4e62-ab01-dc3da7ef78de', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Arquivo', 'arquivo')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('6c6fe926-673d-4189-ab8c-e950d5fc5c1a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Correspondências', 'correspondencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('43ccf3b2-b24a-420e-804f-7243fe2d14ef', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Contratos', 'contratos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f8a8b0f4-0b20-4745-bf7a-b8fed423d679', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Convênios', 'convenios')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('340a0346-9c24-4832-881d-14add6faf906', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Compras', 'compras')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('337dc73f-512c-4865-b5e3-692a9c02879b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Serviços', 'servicos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bbaf52e9-a03f-422e-b2b6-ded7eee0a97d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Prestação de Contas', 'prestacao-de-contas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('556fbef9-bcee-455d-a901-0bc1a281aee6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('faaf00ec-a82d-42ba-aa9c-f4b8b339ce4a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', 'c780e33e-3cfd-4a7e-ac35-1d8ea3c299ae', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c960a504-bad7-4237-9ef7-b9c6eb50c8d3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('dd82bae3-ad16-4688-93b5-70de89aecf66', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Execução Financeira', 'execucao-financeira')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1d28b785-f858-43f6-be6f-974cc30a4eb2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Adiantamentos', 'adiantamentos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e923b9bb-c055-4465-ac7f-267488d71f0e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Prestação de Contas', 'prestacao-de-contas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c1975885-ecdb-49a9-9a05-57e334657879', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'APM', 'apm')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('08b0023d-dde6-4811-ab3f-922acb286a79', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Repasses Estaduais', 'repasses-estaduais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('85517000-4bcb-4c0e-807b-343d54c88160', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Repasses Federais', 'repasses-federais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('905a7fb6-4c7c-40d2-a398-9ccce1855e7f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Contratos e Convênios', 'contratos-e-convenios')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('afeec0e8-8f5b-45aa-91f8-d8b52979dd15', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Parcelamentos', 'parcelamentos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('30c5cdcd-9dd6-49c8-8aea-72bb519aafff', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Notificações', 'notificacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('1aaa03e2-a11a-488e-8e6b-c9822d10f7a0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Órgãos de Controle', 'orgaos-de-controle')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('58a64230-da9b-4e79-a318-69eb958b1aba', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Pareceres', 'pareceres')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('82f3bd1c-5675-4417-8db5-dcc96ca261e8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2496de33-a656-441e-a311-291f377b459d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '715f1a14-a59d-4841-aebc-d1b183047faa', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('334615ea-5c40-4979-bbfb-0b4420fb1ee0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('93380dae-05fb-4db9-b22d-ef152c7d58b5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Compras', 'compras')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('a296b936-960c-49ec-941d-71120660e289', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Licitações', 'licitacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bfac1377-4c8e-4e28-9786-e36e19deb3b5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Termos de Referência', 'termos-de-referencia')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7d30e755-45dd-4a09-baf7-8109b34fa8e3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Contratos', 'contratos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f01cc642-3142-4c7f-9e7c-d98f51297c5e', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Convênios', 'convenios')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('077d6328-601f-441b-bc08-39d0d8e60919', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Fornecedores', 'fornecedores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ce1fa1a7-6870-442e-b85e-6a1cee6e11f6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Serviços', 'servicos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0993c1e6-21b9-413a-907c-f70a7418eae6', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Alimentação Escolar', 'alimentacao-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('fea0b884-6334-4e04-b2bf-4e8ebf4537fe', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Transporte Escolar', 'transporte-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('321f2ce7-7dc2-4be6-a6cc-a4dea7da3dbd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Segurança', 'seguranca')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2bbd27a0-20c9-47d1-8052-1efaf9053f93', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Materiais', 'materiais')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('93946e68-12cb-4e5d-88e1-57c738ce1e0b', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Estoque', 'estoque')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('8ec0cf75-db02-4055-a9cc-7c1598021a93', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Distribuição', 'distribuicao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7fa49ea7-3f04-4822-8352-95b57cc71630', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Recebimentos', 'recebimentos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('4c2c6854-9f30-48a0-8bfa-8b86f7ad3b7a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Inventário de Estoque', 'inventario-de-estoque')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('40011e67-144f-42a3-98d1-4fd7b17c8368', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Consumo', 'consumo')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('63774b12-57da-461e-b4d7-1f125ebcc7ad', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c6d104a6-f5b1-4219-a196-9d59a47afd21', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '1c6d589d-c849-425e-8b6c-4f8b8f4e166c', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('837a91de-e44f-4740-9bbc-2eb2ad7ed46a', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('dafdf40c-117a-42e3-982a-4d04f8c44fbd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Obras', 'obras')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5ceb24c0-dc7d-4262-b22c-5ac20b58f482', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Manutenções', 'manutencoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('a60feace-edf7-4de8-9dde-e72355ff5eef', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Reformas', 'reformas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b0ed7383-c855-4e59-9d32-9e6c988a610d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Adequações', 'adequacoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('90eacac8-3c41-4ad0-8a8d-9d4dd03e8fa2', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Plano de Obras', 'plano-de-obras')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('240ac70a-7ab3-4436-a633-6af5b25d1340', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Demandas das Escolas', 'demandas-das-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9408f8aa-42db-40b8-9282-b0d12171a7bd', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Infraestrutura Escolar', 'infraestrutura-escolar')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2a930513-5b88-4234-bdfb-b6264a0773bf', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Patrimônio', 'patrimonio')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('08ff7c6d-d76f-4cc5-a91d-f1cfdf294252', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Inventário Patrimonial', 'inventario-patrimonial')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('083066b3-5eeb-43f6-b3ac-c7dfc695d1e0', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Bens Inservíveis', 'bens-inserviveis')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e13dd990-186c-40ec-b668-d68da68807eb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Cadastro Físico das Escolas', 'cadastro-fisico-das-escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('c1087018-4e75-400d-9e51-919577e6ea07', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Dependências', 'dependencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bfbcab21-6ffd-4a47-9df8-5afdd3f1d5f4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Metragens', 'metragens')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('49ec7500-5d1c-48ef-8a8c-8cdb566ad653', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Utilização dos Espaços', 'utilizacao-dos-espacos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('dc4eb23d-495b-4996-85ac-644f56aea5bb', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Escolas', 'escolas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('819d2717-5683-466f-9b5b-5185cec1985f', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('2464da60-9e8f-45da-a1c9-017f4e41e926', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('bc4a8a42-3592-44c5-8062-a238e580a4a8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'Evidências', 'evidencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f10dcb1e-f0f1-47cb-a79a-8225828a406d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Visão Geral', 'visao-geral')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e4dcead8-e17a-4726-b5ef-8af9318e1103', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Fiscalização de Contratos', 'fiscalizacao-de-contratos')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b3e1f3f1-238b-410f-91a4-753aff637a78', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Serviços Terceirizados', 'servicos-terceirizados')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('df255bad-421c-4a4b-aecb-2ac18c870d28', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Obras', 'obras')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('0b25c819-b83b-49ee-baa6-784ebcbfdee1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Reformas', 'reformas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('d378c1e6-de2b-4750-9e30-c5e9117aef4c', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Manutenção', 'manutencao')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5a9e2a8d-3a89-48ec-87cf-cfb7defc1d19', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Inspeções', 'inspecoes')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('f6a240fb-90df-4823-b78c-dea23d6b1db4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Utilidades Públicas', 'utilidades-publicas')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('ab1e68fb-70cb-41a2-8caf-60a4a5e79b05', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Água', 'agua')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5602d749-5e3a-4ea2-87d7-3f42129e3f94', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Energia', 'energia')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('7f3b7419-c6fe-429b-a897-11b6945bb3d5', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Zeladoria', 'zeladoria')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('5cd38307-bb9d-40f4-9436-31f290f783e1', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Limpeza', 'limpeza')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('9595cbf8-a6e0-4a55-ad05-67d90a51c733', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Copa', 'copa')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('27c5c2b6-00ff-42ef-b7aa-2ffdf1bf7b4d', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Patrimônio', 'patrimonio')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e18f666c-9f39-4bec-946e-1e9984b8b4b8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Frota', 'frota')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('009d4a05-537b-4791-be92-118bb830d5f4', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Transporte Interno', 'transporte-interno')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('b6d89b10-a2f0-4b3b-ac6d-7cf50ae696b8', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Evidências', 'evidencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('e60dbd3d-9736-463a-ac8f-1450878291ac', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Pendências', 'pendencias')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.demand_categories (id, organization_id, sector_id, name, slug) values ('03aed138-90f1-4644-86a5-383f2fe712b3', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '94044e0e-37e6-405f-94c9-2bbe08ea70d8', 'Indicadores', 'indicadores')
on conflict (sector_id, slug) do update set name = excluded.name, active = true;
insert into public.hubs (id, organization_id, sector_id, name, url, external_url, description, integration_status, integration_type, status) values ('9b7a30ec-0b3d-4962-9ddf-d03705647813', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '7cf3ae5b-0340-497c-90a6-cb6fb89a11e7', 'SETEC Hub', 'https://setec-hub.vercel.app/login', 'https://setec-hub.vercel.app/login', 'Acessar plataforma operacional do SETEC', 'ATIVO', 'LINK_EXTERNO', 'ATIVO')
on conflict (id) do update set name = excluded.name, url = excluded.url, external_url = excluded.external_url, description = excluded.description, integration_status = excluded.integration_status, integration_type = excluded.integration_type, status = excluded.status, active = true;
insert into public.hubs (id, organization_id, sector_id, name, url, external_url, description, integration_status, integration_type, status) values ('5e49c4bf-ed36-4987-8db0-0877eaa8ad76', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '2c0f43a8-06d6-4987-8690-068cffd8a73a', 'SGE / SEOM Hub', 'https://sge-gsu.vercel.app/', 'https://sge-gsu.vercel.app/', 'Acessar plataforma de gestão do SEOM', 'ATIVO', 'LINK_EXTERNO', 'ATIVO')
on conflict (id) do update set name = excluded.name, url = excluded.url, external_url = excluded.external_url, description = excluded.description, integration_status = excluded.integration_status, integration_type = excluded.integration_type, status = excluded.status, active = true;
insert into public.hubs (id, organization_id, sector_id, name, url, external_url, description, integration_status, integration_type, status) values ('29a67552-b9a9-44a4-90b9-8cf68352b868', '2bc6e1d8-1f4c-4a7f-85fd-ad362c3f46d3', '001d0859-6052-49fa-adeb-67a696e114ce', 'ESE Hub GSU', 'https://ese-hub-gsu.vercel.app/login?redirectTo=%2F', 'https://ese-hub-gsu.vercel.app/login?redirectTo=%2F', 'Acessar plataforma da Equipe de Supervisão de Ensino', 'ATIVO', 'LINK_EXTERNO', 'ATIVO')
on conflict (id) do update set name = excluded.name, url = excluded.url, external_url = excluded.external_url, description = excluded.description, integration_status = excluded.integration_status, integration_type = excluded.integration_type, status = excluded.status, active = true;

commit;
