import Badge, { BadgeProps } from "./Badge";

import statciFeaturedImage from "../../assets/images/demo-pic.png";
import Button, { ButtonProps } from "./Button";

interface CardProps {
  img?: string;
  title?: string;
  cardClassName?: string;
  excerpt?: string;
  featured?: string;
  tags?: BadgeProps[];
  actionButton?: ButtonProps;
}

const Card = ({
  img,
  title,
  cardClassName,
  excerpt,
  featured,
  tags,
  actionButton,
}: CardProps) => {
  return (
    <div
      className={`card bg-surfaceBg border border-surfaceBorder + ${cardClassName}`}
    >
      <figure>
        {featured && (
          <Badge
            text={featured}
            className="badge-accent absolute right-2 top-2"
          />
        )}

        <img
          src={img ?? statciFeaturedImage}
          className="w-full h-44 object-cover"
          alt={title}
        />
      </figure>
      <div className="card-body gap-4 p-4">
        <div className="flex-1 justify-between flex flex-col gap-y-3">
          <h2 className="card-title text-lg">{title}</h2>
          {excerpt && (
            <p
              dangerouslySetInnerHTML={{ __html: excerpt && excerpt }}
              className="line-clamp-2 text-neutrals400"
            />
          )}
          {tags && (
            <div className="card-actions">
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  text={tag.text}
                  className="badge-outline hover:bg-neutral hover:text-neutral-content"
                />
              ))}
            </div>
          )}
        </div>
        {actionButton && (
          <Button
            text={actionButton.text}
            onAction={actionButton.onAction}
            link={actionButton.link}
            className={actionButton.className}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
