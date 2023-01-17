-- Criação categorias
CREATE TABLE categorias(
	cat_id SERIAL PRIMARY KEY,
	cat_nome VARCHAR(256),
	cat_descricao VARCHAR(512)
);

-- Criação tipos_pagamentos
CREATE TABLE tipos_pagamentos(
	tpg_id SERIAL PRIMARY KEY,
	tpg_tipo VARCHAR(128)
);
-- Criação estabelecimentos

CREATE TABLE enderecos(
	end_id SERIAL PRIMARY KEY,
	end_cep VARCHAR(9),
	end_logradouro VARCHAR( 128),
	end_bairro VARCHAR(64),
	end_localidade VARCHAR(64),
	end_uf VARCHAR(2)
);


-- Criação despesas
CREATE TABLE despesas(
	des_id SERIAL PRIMARY KEY,
	des_valor DECIMAL(10,2),
	des_data_compra DATE,
	des_descricao VARCHAR(256),
	des_tpg_id INTEGER NOT NULL,
	des_cat_id INTEGER NOT NULL,
	des_end_id INTEGER NOT NULL,
	des_numero_estabelecimento VARCHAR(16),
	CONSTRAINT fk_des_cat FOREIGN KEY(des_cat_id)
		REFERENCES categorias (cat_id)
		ON DELETE RESTRICT ON UPDATE CASCADE,

	CONSTRAINT fk_des_tpg FOREIGN KEY(des_tpg_id)
		REFERENCES tipos_pagamentos (tpg_id)
		ON DELETE RESTRICT ON UPDATE CASCADE,

	CONSTRAINT fk_des_end FOREIGN KEY(des_end_id)
		REFERENCES enderecos (end_id)
		ON DELETE RESTRICT ON UPDATE CASCADE
);

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