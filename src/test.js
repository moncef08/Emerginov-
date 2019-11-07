

export const PhpCode = <?php

$project = 'Uniter';

class English {
   public function exclaim($text) {
       return $text . '!';
   }
}

$lang = ($info->getCC() === 'en') ? new English : null;

echo $info->salutation .
   ' from ' .
   $lang->exclaim($project);
?>;

export default PhpCode;
