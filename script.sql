-- ALTER SESSION
alter session set "_ORACLE_SCRIPT" = true;

-- Criação categorias
CREATE TABLE categorias(
	cat_id INTEGER NOT NULL,
	cat_nome VARCHAR2(256),
	cat_descricao VARCHAR2(512)
);
ALTER TABLE categorias ADD CONSTRAINT pk_cat PRIMARY KEY(cat_id);

CREATE SEQUENCE sq_cat nocache;
CREATE TRIGGER tg_sq_cat before INSERT ON categorias FOR EACH ROW
BEGIN
    :new.cat_id :=sq_cat.nextval;
END;
/
-- Criação tipos_pagamentos
CREATE TABLE tipos_pagamentos(
	tpg_id INTEGER NOT NULL,
	tpg_tipo VARCHAR2(128)
);
ALTER TABLE tipos_pagamentos ADD CONSTRAINT pk_tpg PRIMARY KEY (tpg_id);

CREATE SEQUENCE sq_tpg nocache;
CREATE TRIGGER tg_sq_tpg before INSERT ON tipos_pagamentos FOR EACH ROW
BEGIN
    :new.tpg_id :=sq_tpg.nextval;
END;
/
-- Criação estabelecimentos

CREATE TABLE enderecos(
	end_id INTEGER NOT NULL,
	end_cep VARCHAR2(9),
	end_logradouro VARCHAR2( 128),
	end_bairro VARCHAR2(64),
	end_localidade VARCHAR2(64),
	end_uf VARCHAR2(2)
);
ALTER TABLE enderecos ADD CONSTRAINT pk_end PRIMARY KEY (end_id);


CREATE SEQUENCE sq_end nocache;
CREATE TRIGGER tg_sq_end before INSERT ON enderecos FOR EACH ROW
BEGIN
    :new.end_id :=sq_end.nextval;
END;
/
-- Criação despesas
CREATE TABLE despesas(
	des_id INTEGER NOT NULL,
	des_valor DECIMAL(10,2),
	des_data_compra DATE,
	des_descricao VARCHAR2(256),
	des_tpg_id INTEGER NOT NULL,
	des_cat_id INTEGER NOT NULL,
	des_end_id INTEGER,
	des_numero_estabelecimento VARCHAR2(16)
);
ALTER TABLE despesas ADD CONSTRAINT pk_des PRIMARY KEY(des_id);
ALTER TABLE despesas ADD CONSTRAINT fk_des_cat FOREIGN KEY(des_cat_id)
	REFERENCES categorias (cat_id);
ALTER TABLE despesas ADD CONSTRAINT fk_des_tpg FOREIGN KEY(des_tpg_id)
	REFERENCES tipos_pagamentos(tpg_id);
ALTER TABLE despesas ADD CONSTRAINT fk_des_end FOREIGN KEY(des_end_id)
	REFERENCES enderecos(end_id);

INSERT INTO tipos_pagamentos(
  tpg_tipo
) VALUES ('PIX');
INSERT INTO tipos_pagamentos(
  tpg_tipo
) VALUES ('Crédito');
INSERT INTO tipos_pagamentos(
  tpg_tipo
) VALUES ('Débito');
INSERT INTO tipos_pagamentos(
  tpg_tipo
) VALUES ('Dinheiro');