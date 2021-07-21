CREATE TABLE public.entries
(
    id integer NOT NULL DEFAULT nextval('entries_id_seq'::regclass),
    "userID" integer NOT NULL,
    text character varying(200) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    CONSTRAINT entries_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.entries
    OWNER to postgres;

GRANT ALL ON TABLE public.entries TO postgres;