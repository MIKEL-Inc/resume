# Database Naming Conventions

- SQL keywords in UPPERCASE.
- Identifiers use lowercase, underscores, and no spaces to avoid needing double quotes.
  E.g. `table_name`.
  Postgres folds identifies to lower case if there are no quotes.
  E.g. `MyTable`, `MYTABLE`, and `mytable` are all the same, but `"MYTABLE"` and `"MyTable"` are different. [SO](https://stackoverflow.com/a/25859628/9906608)
- Avoid keywords for identifiers. While they can be double quoted and used, Don't.
- Prefer singular table names. E.g. `user` over `users`
- Prefix fieldnames with their table names or aliases.
- Aliases are short, meaningful, and uppercase.
- Use `T_` for temporary tables.
- Use optional keyword `AS` for aliases.
- Don't prefix tables.
- Do prefix views `vw_`.
- Do prefix stored porcedures with `proc_`.  NOT `sp_`!  Some system reserves `sp_` for internal use.
- Use indentation for next nested queries.
- Use Prefix commas for lists to help debugging.

```sql
SELECT C.id
     , C.name
     , C.folder
     , CS.num_users active_members
     , CS.num_videos

FROM campaign AS C
INNER JOIN campaign_stats AS CS
ON CS.campaign_id = C.id
JOIN (
    SELECT _C.id
         , _C.name

    FROM campaign AS _C
    WHERE _C.type = 9
    ) AS T_C
ON T_C.id = C.id

WHERE C.id IN (1,2,3)
    AND CS.num_videos > 10
```

## References

- [SQL Coding Standards To Each His Own Part II](http://www.postgresonline.com/journal/index.php?/archives/97-SQL-Coding-Standards-To-Each-His-Own-Part-II.html)
- [SO - What SQL coding standard do you follow? [closed]](https://stackoverflow.com/a/522410/9906608)
- [Database Coding Standard and Guideline](http://www.nyx.net/~bwunder/dbChangeControl/standard.htm)
- [SO - What SQL coding standard do you follow? [closed]](https://stackoverflow.com/a/522565/9906608)
