-- Should entries contain usernames? Or just userIDs?

CREATE TABLE public.entries
(
    id integer NOT NULL DEFAULT nextval('entries_id_seq'::regclass),
    text character varying(200) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    "userID" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    username character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT entries_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.entries
    OWNER to postgres;

GRANT ALL ON TABLE public.entries TO postgres;